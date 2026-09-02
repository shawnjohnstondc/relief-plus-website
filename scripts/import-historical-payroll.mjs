import { createHash, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";
import postgres from "postgres";
import { expectedGrossCents, parseHistoricalPayrollCsv } from "../lib/time-card/historical-payroll.ts";

const EXPECTED_FILES = new Set([
  "Relief-Plus-Payroll-2026-07-30-to-2026-08-12.csv",
  "Relief-Plus-Payroll-2026-08-13-to-2026-08-26.csv",
  "Relief-Plus-Payroll-2026-08-27-to-2026-09-09.csv",
]);
const EXPECTED_EMPLOYEES = new Set(["Lisa Bernard", "Jeanne Saucier", "Kelci Richard"]);
const SOURCE = "Relief Plus legacy time-card CSV export";

const mode = process.argv[2];
const filePaths = process.argv.slice(3);
if (!new Set(["--dry-run", "--import"]).has(mode) || filePaths.length !== 3) {
  throw new Error("Usage: npm run time-card:import-history -- --dry-run|--import <three approved CSV paths>");
}
if (!process.env.TIME_CARD_DATABASE_URL) throw new Error("TIME_CARD_DATABASE_URL is required.");

const files = await Promise.all(filePaths.map(async (filePath) => {
  const sourceFile = path.basename(filePath);
  if (!EXPECTED_FILES.has(sourceFile)) throw new Error(`Unexpected source file: ${sourceFile}`);
  const contents = await readFile(filePath, "utf8");
  return {
    sourceFile,
    contents,
    sourceSha256: createHash("sha256").update(contents).digest("hex"),
    rows: parseHistoricalPayrollCsv(contents),
  };
}));

if (new Set(files.map((file) => file.sourceFile)).size !== EXPECTED_FILES.size) throw new Error("All three distinct approved exports are required.");
const rows = files.flatMap((file) => file.rows.map((row) => ({ ...row, sourceFile: file.sourceFile, sourceSha256: file.sourceSha256 })));
if (rows.length !== 9) throw new Error(`Expected exactly 9 historical rows; found ${rows.length}.`);
if (rows.some((row) => !EXPECTED_EMPLOYEES.has(row.employeeName)) || new Set(rows.map((row) => row.employeeName)).size !== 3) {
  throw new Error("Employee names do not match the three initialized hourly employees.");
}
const combinations = new Set(rows.map((row) => `${row.employeeName}|${row.payPeriodStart}|${row.payPeriodEnd}`));
if (combinations.size !== 9) throw new Error("The source files contain duplicate employee/pay-period combinations.");

const ratesByEmployee = new Map();
for (const row of rows) {
  const prior = ratesByEmployee.get(row.employeeName);
  if (prior !== undefined && prior !== row.hourlyRateCents) throw new Error(`${row.employeeName} has inconsistent historical hourly rates.`);
  ratesByEmployee.set(row.employeeName, row.hourlyRateCents);
}

const sql = postgres(process.env.TIME_CARD_DATABASE_URL, { max: 1, prepare: false, ssl: "require", transform: postgres.camel });
try {
  const users = await sql`select id, name, role, login_identifier from time_card_users where active = true`;
  const admin = users.find((user) => user.role === "ADMIN" && user.loginIdentifier === "shawn-d-johnston");
  if (!admin) throw new Error("Initialized Relief Plus administrator mapping was not found.");
  const employeeIds = new Map();
  for (const name of EXPECTED_EMPLOYEES) {
    const matches = users.filter((user) => user.role === "EMPLOYEE" && user.name === name);
    if (matches.length !== 1) throw new Error(`Expected exactly one initialized employee mapping for ${name}.`);
    employeeIds.set(name, matches[0].id);
  }

  const existing = await sql`
    select employee_id, pay_period_start::text, pay_period_end::text,
      worked_hundredths, holiday_hundredths, adjustment_hundredths,
      total_paid_hundredths, hourly_rate_cents, estimated_gross_cents
    from historical_payroll_summaries
  `;
  let alreadyPresent = 0;
  for (const row of rows) {
    const match = existing.find((item) => item.employeeId === employeeIds.get(row.employeeName)
      && item.payPeriodStart === row.payPeriodStart && item.payPeriodEnd === row.payPeriodEnd);
    if (!match) continue;
    const fields = ["workedHundredths", "holidayHundredths", "adjustmentHundredths", "totalPaidHundredths", "hourlyRateCents", "estimatedGrossCents"];
    if (fields.some((field) => match[field] !== row[field])) throw new Error(`Existing historical summary conflicts with ${row.employeeName} ${row.payPeriodStart}–${row.payPeriodEnd}.`);
    alreadyPresent += 1;
  }

  const grossDifferences = rows.filter((row) => expectedGrossCents(row) !== row.estimatedGrossCents);
  process.stdout.write(`Validated 3 files, 9 rows, 3 exact employee mappings, and ${alreadyPresent} matching existing summaries.\n`);
  process.stdout.write(`Source gross differs from simple hours × rate rounding on ${grossDifferences.length} row(s); source values will be preserved exactly.\n`);
  if (mode === "--dry-run") {
    process.stdout.write("Dry run complete. No database records were changed.\n");
    process.exitCode = 0;
  } else {
    if (!process.stdin.isTTY) throw new Error("Import requires a private interactive terminal.");
    const prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
    const confirmation = await prompt.question("Import 9 historical summary rows into the Preview database? Type IMPORT HISTORICAL SUMMARIES: ");
    prompt.close();
    if (confirmation !== "IMPORT HISTORICAL SUMMARIES") throw new Error("Confirmation did not match. Nothing was changed.");

    const result = await sql.begin(async (tx) => {
      let inserted = 0;
      let skipped = 0;
      for (const file of files) {
        let batch = (await tx`
          select id from historical_payroll_import_batches
          where source = ${SOURCE} and source_sha256 = ${file.sourceSha256}
          for update
        `)[0];
        let newBatch = false;
        if (!batch) {
          batch = (await tx`
            insert into historical_payroll_import_batches
              (source, source_file, source_sha256, row_count, imported_by)
            values (${SOURCE}, ${file.sourceFile}, ${file.sourceSha256}, ${file.rows.length}, ${admin.id})
            returning id
          `)[0];
          newBatch = true;
        }
        for (const row of file.rows) {
          const insertedRows = await tx`
            insert into historical_payroll_summaries
              (employee_id, pay_period_start, pay_period_end, worked_hundredths,
               holiday_hundredths, adjustment_hundredths, total_paid_hundredths,
               hourly_rate_cents, estimated_gross_cents, source, import_batch_id, created_by)
            values (${employeeIds.get(row.employeeName)}, ${row.payPeriodStart}, ${row.payPeriodEnd},
              ${row.workedHundredths}, ${row.holidayHundredths}, ${row.adjustmentHundredths},
              ${row.totalPaidHundredths}, ${row.hourlyRateCents}, ${row.estimatedGrossCents},
              ${SOURCE}, ${batch.id}, ${admin.id})
            on conflict (employee_id, pay_period_start, pay_period_end) do nothing
            returning id
          `;
          if (insertedRows.length) inserted += 1;
          else skipped += 1;
        }
        if (newBatch) {
          await tx`insert into audit_logs
            (actor_id, action, entity_type, entity_id, after_json, reason, request_id)
            values (${admin.id}, 'IMPORT_HISTORICAL_PAYROLL', 'historical_payroll_import_batch',
              ${batch.id}, ${tx.json({ sourceFile: file.sourceFile, rowCount: file.rows.length })},
              ${`Imported pay-period summaries from ${file.sourceFile}; no punches created.`}, ${randomUUID()})`;
        }
      }

      const earliestStart = rows.map((row) => row.payPeriodStart).sort()[0];
      for (const [employeeName, hourlyRateCents] of ratesByEmployee) {
        const employeeId = employeeIds.get(employeeName);
        const applicable = (await tx`
          select hourly_rate_cents, effective_date::text from employee_pay_rates
          where employee_id = ${employeeId} and effective_date <= ${earliestStart}::date and voided_at is null
          order by effective_date desc limit 1
        `)[0];
        if (applicable && applicable.hourlyRateCents !== hourlyRateCents) throw new Error(`Existing rate conflicts with the historical rate for ${employeeName}.`);
        if (!applicable) {
          await tx`insert into employee_pay_rates (employee_id, hourly_rate_cents, effective_date, created_by)
            values (${employeeId}, ${hourlyRateCents}, ${earliestStart}, ${admin.id})
            on conflict do nothing`;
        }
      }
      return { inserted, skipped };
    });
    process.stdout.write(`Import complete: ${result.inserted} inserted, ${result.skipped} already present, 0 punches created.\n`);
  }
} finally {
  await sql.end();
}

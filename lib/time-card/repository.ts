import "server-only";
import { randomUUID } from "node:crypto";
import type Postgres from "postgres";
import { timeCardDatabase } from "./database";
import { elapsedWholeMinutes, estimateGrossPay, localDateForInstant, payrollTotals } from "./payroll";
import type { HistoricalPayrollSummary } from "./historical-payroll";
import type { EmployeePayRate, PaidTimeEntry, PayPeriod, PayrollTotals, TimeCardRole, TimeCardUser, TimeEntry } from "./types";

export async function listActiveEmployees() {
  return timeCardDatabase()<TimeCardUser[]>`
    select id, login_identifier, name, role, active from time_card_users
    where active = true and role = 'EMPLOYEE' order by name
  `;
}

export async function listActiveUsersForLogin() {
  return timeCardDatabase()<TimeCardUser[]>`
    select id, login_identifier, name, role, active from time_card_users
    where active = true order by case when role = 'EMPLOYEE' then 0 else 1 end, name
  `;
}

export async function findLoginUser(loginIdentifier: string) {
  const rows = await timeCardDatabase()<Array<TimeCardUser & { pinHash: string; lockedUntil: Date | null }>>`
    select id, login_identifier, name, role, active, pin_hash, locked_until
    from time_card_users where login_identifier = ${loginIdentifier} and active = true limit 1
  `;
  return rows[0] ?? null;
}

export async function recentLoginAttempts(loginKeyHash: string, ipHash: string) {
  void ipHash;
  return timeCardDatabase()<Array<{ succeeded: boolean; attemptedAt: Date }>>`
    select succeeded, attempted_at from login_attempts
    where login_key_hash = ${loginKeyHash}
      and attempted_at >= now() - interval '15 minutes'
    order by attempted_at desc
  `;
}

export async function recordLoginAttempt(input: { loginKeyHash: string; ipHash: string; succeeded: boolean; userId?: string }) {
  const sql = timeCardDatabase();
  await sql.begin(async (tx) => {
    await tx`insert into login_attempts (login_key_hash, ip_hash, succeeded) values (${input.loginKeyHash}, ${input.ipHash}, ${input.succeeded})`;
    if (input.userId && input.succeeded) {
      await tx`update time_card_users set failed_login_count = 0, last_failed_login_at = null, locked_until = null where id = ${input.userId}`;
    } else if (input.userId) {
      await tx`update time_card_users set failed_login_count = failed_login_count + 1, last_failed_login_at = now() where id = ${input.userId}`;
    }
  });
}

export async function lockUser(userId: string, lockedUntil: Date) {
  await timeCardDatabase()`update time_card_users set locked_until = ${lockedUntil} where id = ${userId}`;
}

export async function clearUserLoginState(userId: string) {
  await timeCardDatabase()`
    update time_card_users
    set locked_until = null, failed_login_count = 0, last_failed_login_at = null
    where id = ${userId}
  `;
}

export async function openPunch(employeeId: string) {
  const rows = await timeCardDatabase()<TimeEntry[]>`
    select id, employee_id, clock_in, clock_out, source, note, voided_at
    from time_entries where employee_id = ${employeeId} and clock_out is null and voided_at is null limit 1
  `;
  return rows[0] ?? null;
}

export async function clockIn(employeeId: string) {
  const sql = timeCardDatabase();
  return sql.begin(async (tx) => {
    const users = await tx<Array<{ role: TimeCardRole; active: boolean }>>`select role, active from time_card_users where id = ${employeeId} for update`;
    if (users[0]?.role !== "EMPLOYEE" || !users[0].active) throw new Error("Only active hourly employees can use the clock.");
    const rows = await tx<Array<{ id: string; clockIn: Date }>>`
      insert into time_entries (employee_id, clock_in, source, created_by)
      values (${employeeId}, now(), 'EMPLOYEE', ${employeeId}) returning id, clock_in
    `;
    return rows[0];
  });
}

export async function clockOut(employeeId: string) {
  const rows = await timeCardDatabase()<Array<{ id: string; clockIn: Date; clockOut: Date }>>`
    update time_entries set clock_out = now()
    where id = (select id from time_entries where employee_id = ${employeeId} and clock_out is null and voided_at is null limit 1 for update skip locked)
    returning id, clock_in, clock_out
  `;
  if (!rows[0]) throw new Error("Employee does not have an open punch.");
  return rows[0];
}

export async function employeeEntries(employeeId: string, period: PayPeriod) {
  return timeCardDatabase()<TimeEntry[]>`
    select id, employee_id, clock_in, clock_out, source, note, voided_at
    from time_entries
    where employee_id = ${employeeId} and voided_at is null
      and (clock_in at time zone 'America/Chicago')::date between ${period.start}::date and ${period.end}::date
    order by clock_in desc
  `;
}

export async function paidEntries(employeeId: string, period: PayPeriod) {
  return timeCardDatabase()<PaidTimeEntry[]>`
    select id, employee_id, type, payroll_date::text, minutes, note
    from paid_time_entries where employee_id = ${employeeId} and voided_at is null
      and payroll_date between ${period.start}::date and ${period.end}::date
    order by payroll_date desc, created_at desc
  `;
}

export function totalsFor(entries: TimeEntry[], paid: PaidTimeEntry[], now = new Date()): PayrollTotals {
  const worked = entries.reduce((sum, entry) => sum + (entry.clockOut ? elapsedWholeMinutes(new Date(entry.clockIn), new Date(entry.clockOut)) : 0), 0);
  const holiday = paid.filter((entry) => entry.type === "HOLIDAY").reduce((sum, entry) => sum + entry.minutes, 0);
  const adjustment = paid.filter((entry) => entry.type === "ADJUSTMENT").reduce((sum, entry) => sum + entry.minutes, 0);
  void now;
  return payrollTotals(worked, holiday, adjustment);
}

export async function adminPayroll(period: PayPeriod) {
  const employees = await listActiveEmployees();
  return Promise.all(employees.map(async (employee) => {
    const [entries, paid, rates] = await Promise.all([employeeEntries(employee.id, period), paidEntries(employee.id, period), employeePayRates(employee.id)]);
    return { employee, entries, paid, rates, currentRate: rateEffectiveOn(rates, localDateForInstant(new Date())), gross: estimateGrossPay(entries, paid, rates), totals: totalsFor(entries, paid), openPunch: entries.find((entry) => !entry.clockOut) ?? await openPunch(employee.id) };
  }));
}

export async function employeePayRates(employeeId: string) {
  return timeCardDatabase()<EmployeePayRate[]>`select id, employee_id, hourly_rate_cents, effective_date::text, created_at from employee_pay_rates where employee_id = ${employeeId} and voided_at is null order by effective_date desc`;
}

export function rateEffectiveOn(rates: EmployeePayRate[], date: string) {
  return rates.find((rate) => rate.effectiveDate <= date) ?? null;
}

export async function setEmployeePayRate(input: { actorId: string; employeeId: string; hourlyRateCents: number; effectiveDate: string; reason: string }) {
  return timeCardDatabase().begin(async (tx) => {
    await assertHourlyEmployee(tx, input.employeeId);
    const before = (await tx<EmployeePayRate[]>`select id, employee_id, hourly_rate_cents, effective_date::text, created_at from employee_pay_rates where employee_id = ${input.employeeId} and effective_date = ${input.effectiveDate}::date and voided_at is null for update`)[0];
    if (before) await tx`update employee_pay_rates set voided_at = now(), voided_by = ${input.actorId}, void_reason = ${input.reason} where id = ${before.id}`;
    const after = (await tx<EmployeePayRate[]>`insert into employee_pay_rates (employee_id, hourly_rate_cents, effective_date, created_by) values (${input.employeeId}, ${input.hourlyRateCents}, ${input.effectiveDate}, ${input.actorId}) returning id, employee_id, hourly_rate_cents, effective_date::text, created_at`)[0];
    await insertAudit(tx, { ...input, action: "SET_PAY_RATE", entityType: "employee_pay_rate", entityId: after.id, before, after });
    return after;
  });
}

export async function adminClockEmployee(input: { actorId: string; employeeId: string; intent: "in" | "out"; reason?: string }) {
  return timeCardDatabase().begin(async (tx) => {
    await assertHourlyEmployee(tx, input.employeeId);
    const open = (await tx<TimeEntry[]>`select id, employee_id, clock_in, clock_out, source, note, voided_at from time_entries where employee_id = ${input.employeeId} and clock_out is null and voided_at is null limit 1 for update`)[0];
    const reason = input.reason?.trim() || `Administrative clock ${input.intent}`;
    if (input.intent === "in") {
      if (open) throw new Error("Employee is already clocked in.");
      const after = (await tx<TimeEntry[]>`insert into time_entries (employee_id, clock_in, source, note, created_by) values (${input.employeeId}, now(), 'ADMIN', ${reason}, ${input.actorId}) returning id, employee_id, clock_in, clock_out, source, note, voided_at`)[0];
      await insertAudit(tx, { ...input, action: "ADMIN_CLOCK_IN", entityType: "time_entry", entityId: after.id, after, reason });
      return after;
    }
    if (!open) throw new Error("Employee is already clocked out.");
    const after = (await tx<TimeEntry[]>`update time_entries set clock_out = now(), note = coalesce(note, ${reason}) where id = ${open.id} returning id, employee_id, clock_in, clock_out, source, note, voided_at`)[0];
    await insertAudit(tx, { ...input, action: "ADMIN_CLOCK_OUT", entityType: "time_entry", entityId: after.id, before: open, after, reason });
    return after;
  });
}

async function insertAudit(tx: Postgres.TransactionSql, input: { actorId: string; employeeId: string; action: string; entityType: string; entityId: string; before?: unknown; after?: unknown; reason: string }) {
  const before = JSON.parse(JSON.stringify(input.before ?? null)) as Postgres.JSONValue;
  const after = JSON.parse(JSON.stringify(input.after ?? null)) as Postgres.JSONValue;
  await tx`insert into audit_logs (actor_id, employee_id, action, entity_type, entity_id, before_json, after_json, reason, request_id)
    values (${input.actorId}, ${input.employeeId}, ${input.action}, ${input.entityType}, ${input.entityId}, ${tx.json(before)}, ${tx.json(after)}, ${input.reason}, ${randomUUID()})`;
}

async function assertHourlyEmployee(tx: Postgres.TransactionSql, employeeId: string) {
  const rows = await tx<Array<{ id: string }>>`select id from time_card_users where id = ${employeeId} and role = 'EMPLOYEE' and active = true`;
  if (!rows[0]) throw new Error("An active hourly employee is required.");
}

export async function addManualPunch(input: { actorId: string; employeeId: string; clockIn: Date; clockOut: Date; reason: string }) {
  const sql = timeCardDatabase();
  return sql.begin(async (tx) => {
    await assertHourlyEmployee(tx, input.employeeId);
    const rows = await tx<Array<{ id: string; clockIn: Date; clockOut: Date }>>`insert into time_entries (employee_id, clock_in, clock_out, source, note, created_by) values (${input.employeeId}, ${input.clockIn}, ${input.clockOut}, 'ADMIN', ${input.reason}, ${input.actorId}) returning id, clock_in, clock_out`;
    await insertAudit(tx, { ...input, action: "ADD_MISSED_TIME", entityType: "time_entry", entityId: rows[0].id, after: rows[0] });
    return rows[0];
  });
}

export async function correctPunch(input: { actorId: string; employeeId: string; entryId: string; clockIn: Date; clockOut: Date; reason: string }) {
  const sql = timeCardDatabase();
  return sql.begin(async (tx) => {
    await assertHourlyEmployee(tx, input.employeeId);
    const before = (await tx<Array<{ id: string; clockIn: Date; clockOut: Date | null }>>`select id, clock_in, clock_out from time_entries where id = ${input.entryId} and employee_id = ${input.employeeId} and voided_at is null for update`)[0];
    if (!before) throw new Error("Punch not found.");
    const after = (await tx<Array<{ id: string; clockIn: Date; clockOut: Date }>>`update time_entries set clock_in = ${input.clockIn}, clock_out = ${input.clockOut}, note = ${input.reason} where id = ${input.entryId} returning id, clock_in, clock_out`)[0];
    await insertAudit(tx, { ...input, action: "CORRECT_PUNCH", entityType: "time_entry", entityId: input.entryId, before, after });
    return after;
  });
}

export async function voidPunch(input: { actorId: string; employeeId: string; entryId: string; reason: string }) {
  const sql = timeCardDatabase();
  return sql.begin(async (tx) => {
    await assertHourlyEmployee(tx, input.employeeId);
    const before = (await tx<TimeEntry[]>`select id, employee_id, clock_in, clock_out, source, note, voided_at from time_entries where id = ${input.entryId} and employee_id = ${input.employeeId} and voided_at is null for update`)[0];
    if (!before) throw new Error("Punch not found.");
    await tx`update time_entries set voided_at = now(), voided_by = ${input.actorId}, void_reason = ${input.reason} where id = ${input.entryId}`;
    await insertAudit(tx, { ...input, action: "VOID_PUNCH", entityType: "time_entry", entityId: input.entryId, before, after: { voided: true } });
  });
}

export async function addPaidTime(input: { actorId: string; employeeId: string; type: "HOLIDAY" | "ADJUSTMENT"; payrollDate: string; minutes: number; note: string; reason: string }) {
  const sql = timeCardDatabase();
  return sql.begin(async (tx) => {
    await assertHourlyEmployee(tx, input.employeeId);
    const rows = await tx<Array<{ id: string }>>`insert into paid_time_entries (employee_id, type, payroll_date, minutes, note, created_by) values (${input.employeeId}, ${input.type}, ${input.payrollDate}, ${input.minutes}, ${input.note}, ${input.actorId}) returning id`;
    await insertAudit(tx, { ...input, action: input.type === "HOLIDAY" ? "ADD_HOLIDAY" : "ADD_ADJUSTMENT", entityType: "paid_time_entry", entityId: rows[0].id, after: { type: input.type, payrollDate: input.payrollDate, minutes: input.minutes, note: input.note } });
    return rows[0];
  });
}

export async function addPaidHolidayForEmployees(input: { actorId: string; employeeIds: string[]; payrollDate: string; minutes: number; note: string; reason: string }) {
  const sql = timeCardDatabase();
  return sql.begin(async (tx) => {
    for (const employeeId of input.employeeIds) {
      await assertHourlyEmployee(tx, employeeId);
      const rows = await tx<Array<{ id: string }>>`insert into paid_time_entries (employee_id, type, payroll_date, minutes, note, created_by) values (${employeeId}, 'HOLIDAY', ${input.payrollDate}, ${input.minutes}, ${input.note}, ${input.actorId}) returning id`;
      await insertAudit(tx, { actorId: input.actorId, employeeId, action: "ADD_HOLIDAY", entityType: "paid_time_entry", entityId: rows[0].id, after: { type: "HOLIDAY", payrollDate: input.payrollDate, minutes: input.minutes, note: input.note }, reason: input.reason });
    }
  });
}

export async function auditHistory(employeeId?: string) {
  return timeCardDatabase()<Array<{ id: number; action: string; entityType: string; reason: string | null; createdAt: Date; actorName: string; employeeName: string | null }>>`
    select a.id, a.action, a.entity_type, a.reason, a.created_at, actor.name as actor_name, employee.name as employee_name
    from audit_logs a join time_card_users actor on actor.id = a.actor_id left join time_card_users employee on employee.id = a.employee_id
    where (${employeeId ?? null}::uuid is null or a.employee_id = ${employeeId ?? null}::uuid)
    order by a.created_at desc limit 100
  `;
}

export async function historicalPayrollSummaries() {
  return timeCardDatabase()<HistoricalPayrollSummary[]>`
    select summary.id, summary.employee_id, employee.name as employee_name,
      summary.pay_period_start::text, summary.pay_period_end::text,
      summary.worked_hundredths, summary.holiday_hundredths,
      summary.adjustment_hundredths, summary.total_paid_hundredths,
      summary.hourly_rate_cents, summary.estimated_gross_cents,
      summary.source, batch.source_file, summary.imported_at
    from historical_payroll_summaries summary
    join time_card_users employee on employee.id = summary.employee_id
    join historical_payroll_import_batches batch on batch.id = summary.import_batch_id
    order by summary.pay_period_start desc, employee.name
  `;
}

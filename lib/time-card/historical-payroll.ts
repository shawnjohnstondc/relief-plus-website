export const HISTORICAL_PAYROLL_COLUMNS = [
  "Employee",
  "Pay Period Start",
  "Pay Period End",
  "Worked Hours",
  "Holiday Hours",
  "Adjustment",
  "Total Paid Hours",
  "Hourly Rate",
  "Estimated Gross Pay",
] as const;

export type HistoricalPayrollImportRow = {
  employeeName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  workedHundredths: number;
  holidayHundredths: number;
  adjustmentHundredths: number;
  totalPaidHundredths: number;
  hourlyRateCents: number;
  estimatedGrossCents: number;
};

export type HistoricalPayrollSummary = HistoricalPayrollImportRow & {
  id: string;
  employeeId: string;
  source: string;
  sourceFile: string;
  importedAt: Date;
};

function parseCsvRecords(input: string) {
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      record.push(field);
      field = "";
    } else if (character === "\n") {
      record.push(field.replace(/\r$/, ""));
      if (record.some((value) => value !== "")) records.push(record);
      record = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (quoted) throw new Error("CSV contains an unterminated quoted field.");
  if (field !== "" || record.length > 0) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }
  return records;
}

function parseIsoDate(value: string, label: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error(`${label} must be a valid ISO date.`);
  }
  return value;
}

function parseHundredths(value: string, label: string, allowNegative = false) {
  const pattern = allowNegative ? /^-?\d+\.\d{2}$/ : /^\d+\.\d{2}$/;
  if (!pattern.test(value)) throw new Error(`${label} must use exactly two decimal places.`);
  const hundredths = Math.round(Number(value) * 100);
  if (!Number.isSafeInteger(hundredths)) throw new Error(`${label} is outside the supported range.`);
  return hundredths;
}

export function parseHistoricalPayrollCsv(input: string) {
  const records = parseCsvRecords(input);
  if (records.length < 2) throw new Error("CSV must contain a header and at least one payroll row.");
  const [header, ...data] = records;
  if (header.length !== HISTORICAL_PAYROLL_COLUMNS.length || header.some((value, index) => value !== HISTORICAL_PAYROLL_COLUMNS[index])) {
    throw new Error("CSV columns do not match the approved historical payroll export format.");
  }

  return data.map((values, index): HistoricalPayrollImportRow => {
    if (values.length !== header.length) throw new Error(`CSV row ${index + 2} has an unexpected number of columns.`);
    const row = {
      employeeName: values[0].trim(),
      payPeriodStart: parseIsoDate(values[1], `Row ${index + 2} pay-period start`),
      payPeriodEnd: parseIsoDate(values[2], `Row ${index + 2} pay-period end`),
      workedHundredths: parseHundredths(values[3], `Row ${index + 2} worked hours`),
      holidayHundredths: parseHundredths(values[4], `Row ${index + 2} holiday hours`),
      adjustmentHundredths: parseHundredths(values[5], `Row ${index + 2} adjustment`, true),
      totalPaidHundredths: parseHundredths(values[6], `Row ${index + 2} total paid hours`),
      hourlyRateCents: parseHundredths(values[7], `Row ${index + 2} hourly rate`),
      estimatedGrossCents: parseHundredths(values[8], `Row ${index + 2} estimated gross pay`),
    };
    if (!row.employeeName) throw new Error(`CSV row ${index + 2} has no employee name.`);
    if (row.payPeriodEnd < row.payPeriodStart) throw new Error(`CSV row ${index + 2} has an invalid pay-period range.`);
    if (row.totalPaidHundredths !== row.workedHundredths + row.holidayHundredths + row.adjustmentHundredths) {
      throw new Error(`CSV row ${index + 2} components do not equal total paid hours.`);
    }
    return row;
  });
}

export function formatHundredths(hundredths: number) {
  if (!Number.isInteger(hundredths)) throw new Error("Historical hours must be stored as integer hundredths.");
  return (hundredths / 100).toFixed(2);
}

export function expectedGrossCents(row: HistoricalPayrollImportRow) {
  return Math.round((row.totalPaidHundredths * row.hourlyRateCents) / 100);
}

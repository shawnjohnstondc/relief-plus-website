import { currencyFromCents, decimalHours } from "./payroll";
import type { PayPeriod, PayrollTotals } from "./types";

export function escapeCsv(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function payrollCsv(period: PayPeriod, rows: Array<{ name: string; totals: PayrollTotals; grossCents?: number | null }>) {
  const data: Array<Array<string | number>> = [
    ["Employee", "Period Start", "Period End", "Worked Hours", "Holiday Hours", "Adjustment Hours", "Total Paid Hours", "Estimated Gross"],
    ...rows.map((row) => [row.name, period.start, period.end, decimalHours(row.totals.workedMinutes), decimalHours(row.totals.holidayMinutes), decimalHours(row.totals.adjustmentMinutes), decimalHours(row.totals.totalPaidMinutes), row.grossCents == null ? "Rate required" : currencyFromCents(row.grossCents)]),
  ];
  return data.map((line) => line.map(escapeCsv).join(",")).join("\r\n");
}

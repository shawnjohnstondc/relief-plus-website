import { describe, expect, it } from "vitest";
import { expectedGrossCents, formatHundredths, parseHistoricalPayrollCsv } from "./historical-payroll";

const header = '"Employee","Pay Period Start","Pay Period End","Worked Hours","Holiday Hours","Adjustment","Total Paid Hours","Hourly Rate","Estimated Gross Pay"';

describe("historical payroll CSV", () => {
  it("preserves source hundredths and cents without fabricating punch minutes", () => {
    const rows = parseHistoricalPayrollCsv(`${header}\n"Lisa Bernard","2026-07-30","2026-08-12","26.72","0.00","0.00","26.72","15.00","400.80"`);
    expect(rows).toEqual([{ employeeName: "Lisa Bernard", payPeriodStart: "2026-07-30", payPeriodEnd: "2026-08-12", workedHundredths: 2672, holidayHundredths: 0, adjustmentHundredths: 0, totalPaidHundredths: 2672, hourlyRateCents: 1500, estimatedGrossCents: 40080 }]);
    expect(formatHundredths(rows[0].workedHundredths)).toBe("26.72");
  });

  it("rejects totals that do not reconcile to their components", () => {
    expect(() => parseHistoricalPayrollCsv(`${header}\n"Lisa Bernard","2026-07-30","2026-08-12","1.00","0.00","0.00","2.00","15.00","30.00"`)).toThrow(/components do not equal/);
  });

  it("reports arithmetic gross differences without replacing source gross", () => {
    const [row] = parseHistoricalPayrollCsv(`${header}\n"Jeanne Saucier","2026-08-27","2026-09-09","54.57","0.00","0.00","54.57","75.00","4092.93"`);
    expect(row.estimatedGrossCents).toBe(409293);
    expect(expectedGrossCents(row)).toBe(409275);
  });
});

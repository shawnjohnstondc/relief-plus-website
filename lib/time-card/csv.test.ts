import { describe, expect, it } from "vitest";
import { escapeCsv, payrollCsv } from "./csv";

describe("payroll CSV", () => {
  it("escapes commas, quotes, and line breaks", () => {
    expect(escapeCsv('Johnston, "Shawn"')).toBe('"Johnston, ""Shawn"""');
    expect(escapeCsv("one\ntwo")).toBe('"one\ntwo"');
  });

  it("exports separate components and calculated total paid hours", () => {
    const csv = payrollCsv({ start: "2026-08-24", end: "2026-09-06", index: 1 }, [{ name: "Lisa Bernard", totals: { workedMinutes: 2400, holidayMinutes: 480, adjustmentMinutes: -30, totalPaidMinutes: 2850 } }]);
    expect(csv).toContain("Worked Hours,Holiday Hours,Adjustment Hours,Total Paid Hours");
    expect(csv).toContain("Lisa Bernard,2026-08-24,2026-09-06,40.00,8.00,-0.50,47.50");
  });
});

import { describe, expect, it } from "vitest";
import { adjustmentSchema, loginSchema, manualPunchSchema, paidHolidaySchema } from "./validation";

describe("server input validation", () => {
  it("normalizes login identifiers", () => expect(loginSchema.parse({ loginIdentifier: " Lisa-Bernard ", pin: "1234" }).loginIdentifier).toBe("lisa-bernard"));
  it("rejects a non-four-digit login PIN", () => expect(loginSchema.safeParse({ loginIdentifier: "lisa", pin: "12345" }).success).toBe(false));
  it("rejects a manual punch ending before it starts", () => expect(manualPunchSchema.safeParse({ employeeId: "5ac8b4df-a17f-4bcb-b29d-e5c13f916e53", clockIn: "2026-09-01T10:00:00Z", clockOut: "2026-09-01T09:00:00Z", reason: "Correction" }).success).toBe(false));
  it("permits negative but not zero adjustments", () => {
    const base = { employeeId: "5ac8b4df-a17f-4bcb-b29d-e5c13f916e53", payrollDate: "2026-09-01", reason: "Payroll correction" };
    expect(adjustmentSchema.safeParse({ ...base, minutes: -30 }).success).toBe(true);
    expect(adjustmentSchema.safeParse({ ...base, minutes: 0 }).success).toBe(false);
  });
  it("requires positive holiday minutes and at least one employee", () => {
    expect(paidHolidaySchema.safeParse({ employeeIds: [], payrollDate: "2026-09-01", minutes: 480, note: "Labor Day", reason: "Paid holiday" }).success).toBe(false);
  });
});

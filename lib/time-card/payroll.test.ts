import { describe, expect, it } from "vitest";
import {
  decimalHours,
  dollarsToCents,
  estimateGrossPay,
  hoursToMinutes,
  chicagoLocalDateTimeToInstant,
  elapsedWholeMinutes,
  payPeriodForDate,
  payrollTotals,
  shiftPayPeriod,
} from "./payroll";

describe("exact-minute payroll calculations", () => {
  it.each([
    [15, "0.25"],
    [30, "0.50"],
    [45, "0.75"],
    [240, "4.00"],
    [255, "4.25"],
    [270, "4.50"],
    [285, "4.75"],
  ])("renders %i minutes as %s hours", (minutes, hours) => {
    expect(decimalHours(minutes)).toBe(hours);
  });

  it("uses elapsed whole minutes without punch rounding", () => {
    expect(
      elapsedWholeMinutes(
        new Date("2026-09-01T13:00:00.000Z"),
        new Date("2026-09-01T17:15:00.000Z"),
      ),
    ).toBe(255);
  });

  it("floors incomplete elapsed minutes without rounding punches", () => {
    expect(elapsedWholeMinutes(new Date("2026-09-01T13:00:00Z"), new Date("2026-09-01T13:14:59Z"))).toBe(14);
  });

  it("converts America/Chicago administrative times across standard and daylight time", () => {
    expect(chicagoLocalDateTimeToInstant("2026-01-15T09:00").toISOString()).toBe("2026-01-15T15:00:00.000Z");
    expect(chicagoLocalDateTimeToInstant("2026-09-01T09:00").toISOString()).toBe("2026-09-01T14:00:00.000Z");
  });

  it("rejects a nonexistent spring-forward local time", () => {
    expect(() => chicagoLocalDateTimeToInstant("2026-03-08T02:30")).toThrow("does not exist");
  });

  it("keeps worked, holiday, and signed adjustments separate", () => {
    expect(payrollTotals(2_400, 480, -30)).toEqual({
      workedMinutes: 2_400,
      holidayMinutes: 480,
      adjustmentMinutes: -30,
      totalPaidMinutes: 2_850,
    });
  });
});

describe("rates and estimated gross pay", () => {
  it("parses currency and signed hours without floating-point storage", () => {
    expect(dollarsToCents("19.75")).toBe(1975);
    expect(hoursToMinutes("-0.50")).toBe(-30);
    expect(() => dollarsToCents("19.999")).toThrow();
  });

  it("segments gross pay across effective-dated rates", () => {
    const employeeId = "5ac8b4df-a17f-4bcb-b29d-e5c13f916e53";
    const rates = [
      { id: "1", employeeId, hourlyRateCents: 1000, effectiveDate: "2026-09-01", createdAt: new Date() },
      { id: "2", employeeId, hourlyRateCents: 1200, effectiveDate: "2026-09-02", createdAt: new Date() },
    ];
    const entries = [
      { id: "e1", employeeId, clockIn: new Date("2026-09-01T14:00:00Z"), clockOut: new Date("2026-09-01T15:00:00Z"), source: "EMPLOYEE" as const, note: null, voidedAt: null },
      { id: "e2", employeeId, clockIn: new Date("2026-09-02T14:00:00Z"), clockOut: new Date("2026-09-02T15:00:00Z"), source: "EMPLOYEE" as const, note: null, voidedAt: null },
    ];
    expect(estimateGrossPay(entries, [], rates)).toEqual({ cents: 2200, missingRateDates: [] });
  });

  it("does not present a knowingly inaccurate gross estimate when a rate is missing", () => {
    const employeeId = "5ac8b4df-a17f-4bcb-b29d-e5c13f916e53";
    const entries = [{ id: "e1", employeeId, clockIn: new Date("2026-09-01T14:00:00Z"), clockOut: new Date("2026-09-01T15:00:00Z"), source: "EMPLOYEE" as const, note: null, voidedAt: null }];
    expect(estimateGrossPay(entries, [], [])).toEqual({ cents: null, missingRateDates: ["2026-09-01"] });
  });
});

describe("14-calendar-day pay periods", () => {
  it("uses the approved August anchor period", () => {
    expect(payPeriodForDate("2026-08-10")).toEqual({
      start: "2026-08-10",
      end: "2026-08-23",
      index: 0,
    });
    expect(payPeriodForDate("2026-08-23").start).toBe("2026-08-10");
  });

  it("advances to August 24 through September 6", () => {
    expect(payPeriodForDate("2026-09-06")).toEqual({
      start: "2026-08-24",
      end: "2026-09-06",
      index: 1,
    });
  });

  it("navigates previous and next periods", () => {
    const current = payPeriodForDate("2026-09-01");
    expect(shiftPayPeriod(current, -1).start).toBe("2026-08-10");
    expect(shiftPayPeriod(current, 1).start).toBe("2026-09-07");
  });

  it("supports periods before the anchor", () => {
    expect(payPeriodForDate("2026-08-09")).toEqual({ start: "2026-07-27", end: "2026-08-09", index: -1 });
  });
});

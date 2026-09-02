import { describe, expect, it } from "vitest";
import {
  decimalHours,
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

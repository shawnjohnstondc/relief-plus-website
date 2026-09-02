import { describe, expect, it } from "vitest";
import {
  assertCanClockIn,
  assertCanClockOut,
  assertEmployeeCanClock,
  buildAuditEntry,
  holidayDuplicateKey,
} from "./domain";
import { loginLockoutUntil } from "./rate-limit";
import type { SessionIdentity } from "./types";

const employee: SessionIdentity = {
  sessionId: "session-1",
  userId: "employee-1",
  firstName: "Alex",
  name: "Alex Employee",
  role: "EMPLOYEE",
  active: true,
  expiresAt: new Date("2099-01-01T00:00:00Z"),
};

describe("clock invariants", () => {
  it("allows an active employee to clock", () => {
    expect(() => assertEmployeeCanClock(employee)).not.toThrow();
  });

  it("blocks duplicate clock in", () => {
    expect(() => assertCanClockIn("open-punch")).toThrow("already clocked in");
  });

  it("blocks clock out without an open punch", () => {
    expect(() => assertCanClockOut(null)).toThrow("does not have an open punch");
  });

  it("returns the server-selected open punch for clock out", () => {
    expect(assertCanClockOut("open-punch")).toBe("open-punch");
  });

  it("prevents the admin from entering hourly clock totals", () => {
    expect(() => assertEmployeeCanClock({ ...employee, role: "ADMIN" })).toThrow();
  });
});

describe("administrative payroll safety", () => {
  it("requires a reason and preserves before/after audit values", () => {
    expect(
      buildAuditEntry({
        actorId: "admin-1",
        employeeId: "employee-1",
        action: "CORRECT_PUNCH",
        entityType: "time_entry",
        entityId: "entry-1",
        before: { clockOut: null },
        after: { clockOut: "2026-09-01T22:00:00Z" },
        reason: "Missed clock out",
        requestId: "request-1",
      }),
    ).toMatchObject({
      before: { clockOut: null },
      after: { clockOut: "2026-09-01T22:00:00Z" },
      reason: "Missed clock out",
    });
  });

  it("creates a stable duplicate-holiday key", () => {
    const input = {
      employeeId: "employee-1",
      payrollDate: "2026-09-07",
      note: "Labor Day",
    };
    expect(holidayDuplicateKey(input)).toBe(
      holidayDuplicateKey({ ...input, note: "  LABOR DAY " }),
    );
  });
});

describe("database-backed login policy", () => {
  it("temporarily locks after five recent failures", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const failures = Array.from({ length: 5 }, (_, index) => ({
      succeeded: false,
      attemptedAt: new Date(now.getTime() - index * 60_000),
    }));
    expect(loginLockoutUntil(failures, now)?.toISOString()).toBe(
      "2026-09-01T15:15:00.000Z",
    );
  });
});

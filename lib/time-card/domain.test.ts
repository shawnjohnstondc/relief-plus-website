import { describe, expect, it } from "vitest";
import {
  assertCanClockIn,
  assertCanClockOut,
  assertEmployeeCanClock,
  buildAuditEntry,
  holidayDuplicateKey,
} from "./domain";
import { loginLockoutUntil, storedLoginLockIsCurrent } from "./rate-limit";
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
  it("temporarily delays after eight recent failures", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const failures = Array.from({ length: 8 }, (_, index) => ({
      succeeded: false,
      attemptedAt: new Date(now.getTime() - index * 60_000),
    }));
    expect(loginLockoutUntil(failures, now)?.toISOString()).toBe(
      "2026-09-01T15:02:00.000Z",
    );
  });

  it("does not delay after a first invalid login", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const failures = [{ succeeded: false, attemptedAt: now }];
    expect(loginLockoutUntil(failures, now)).toBeNull();
  });

  it("does not delay after seven failures", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const failures = Array.from({ length: 7 }, (_, index) => ({ succeeded: false, attemptedAt: new Date(now.getTime() - index * 60_000) }));
    expect(loginLockoutUntil(failures, now)).toBeNull();
  });

  it("ignores failures outside the rolling window", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const failures = Array.from({ length: 8 }, () => ({ succeeded: false, attemptedAt: new Date("2026-09-01T14:44:59Z") }));
    expect(loginLockoutUntil(failures, now)).toBeNull();
  });

  it("resets the failure sequence after a successful login", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const attempts = [
      ...Array.from({ length: 8 }, (_, index) => ({ succeeded: false, attemptedAt: new Date(now.getTime() - (13 - index) * 60_000) })),
      { succeeded: true, attemptedAt: new Date(now.getTime() - 4 * 60_000) },
      { succeeded: false, attemptedAt: new Date(now.getTime() - 60_000) },
    ];
    expect(loginLockoutUntil(attempts, now)).toBeNull();
  });

  it("does not let stale historical failures block a valid login", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const stale = Array.from({ length: 20 }, () => ({ succeeded: false, attemptedAt: new Date("2026-08-31T15:00:00Z") }));
    expect(loginLockoutUntil(stale, now)).toBeNull();
  });

  it("honors only a short current account lock", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    expect(storedLoginLockIsCurrent(new Date("2026-09-01T15:01:00Z"), now)).toBe(true);
    expect(storedLoginLockIsCurrent(new Date("2026-09-01T15:15:00Z"), now)).toBe(false);
    expect(storedLoginLockIsCurrent(new Date("2026-09-01T14:59:00Z"), now)).toBe(false);
  });

  it("keeps failure histories isolated by account", () => {
    const now = new Date("2026-09-01T15:00:00Z");
    const employeeAFailures = Array.from({ length: 8 }, () => ({ succeeded: false, attemptedAt: now }));
    const employeeBFailures: Array<{ succeeded: boolean; attemptedAt: Date }> = [];
    expect(loginLockoutUntil(employeeAFailures, now)).not.toBeNull();
    expect(loginLockoutUntil(employeeBFailures, now)).toBeNull();
  });
});

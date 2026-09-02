import type { SessionIdentity } from "./types";

export function assertEmployeeCanClock(session: SessionIdentity) {
  if (!session.active || session.role !== "EMPLOYEE") {
    throw new Error("Only active hourly employees can use the clock.");
  }
}

export function assertCanClockIn(openPunchId: string | null) {
  if (openPunchId) throw new Error("Employee is already clocked in.");
}

export function assertCanClockOut(openPunchId: string | null) {
  if (!openPunchId) throw new Error("Employee does not have an open punch.");
  return openPunchId;
}

export function buildAuditEntry(input: {
  actorId: string;
  employeeId: string;
  action: string;
  entityType: string;
  entityId?: string;
  before?: unknown;
  after?: unknown;
  reason: string;
  requestId: string;
}) {
  if (!input.reason.trim()) throw new Error("A reason is required.");
  return {
    actorId: input.actorId,
    employeeId: input.employeeId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId ?? null,
    before: input.before ?? null,
    after: input.after ?? null,
    reason: input.reason.trim(),
    requestId: input.requestId,
  };
}

export function holidayDuplicateKey(input: {
  employeeId: string;
  payrollDate: string;
  note: string;
}) {
  return `${input.employeeId}:${input.payrollDate}:${input.note.trim().toLocaleLowerCase("en-US")}`;
}

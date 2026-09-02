export type TimeCardRole = "ADMIN" | "EMPLOYEE";

export type SessionIdentity = {
  sessionId: string;
  userId: string;
  firstName: string;
  name: string;
  role: TimeCardRole;
  active: boolean;
  expiresAt: Date;
};

export type PayPeriod = {
  start: string;
  end: string;
  index: number;
};

export type PayrollTotals = {
  workedMinutes: number;
  holidayMinutes: number;
  adjustmentMinutes: number;
  totalPaidMinutes: number;
};

export type TimeCardUser = {
  id: string;
  loginIdentifier: string;
  name: string;
  role: TimeCardRole;
  active: boolean;
};

export type TimeEntry = {
  id: string;
  employeeId: string;
  clockIn: Date;
  clockOut: Date | null;
  source: "EMPLOYEE" | "ADMIN";
  note: string | null;
  voidedAt: Date | null;
};

export type PaidTimeEntry = {
  id: string;
  employeeId: string;
  type: "HOLIDAY" | "ADJUSTMENT";
  payrollDate: string;
  minutes: number;
  note: string;
};

export type EmployeePayRate = {
  id: string;
  employeeId: string;
  hourlyRateCents: number;
  effectiveDate: string;
  createdAt: Date;
};

export type GrossPayEstimate = {
  cents: number | null;
  missingRateDates: string[];
};

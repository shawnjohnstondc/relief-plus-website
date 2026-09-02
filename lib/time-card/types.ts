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

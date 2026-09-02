export const TIME_CARD_TIME_ZONE = "America/Chicago";
export const PAY_PERIOD_ANCHOR = "2026-08-10";
export const PAY_PERIOD_LENGTH_DAYS = 14;

export const DEFAULT_LOGIN_POLICY = {
  windowMinutes: 15,
  maximumAttempts: 5,
  lockoutMinutes: 15,
} as const;

export const DEFAULT_SESSION_POLICY = {
  idleMinutes: 30,
  absoluteHours: 12,
} as const;

export const EMPLOYEE_SESSION_HOURS = 12;
export const ADMIN_SESSION_HOURS = 4;
export const TIME_CARD_SESSION_COOKIE = "__Secure-relief-plus-time-card";

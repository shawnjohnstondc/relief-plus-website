import { DEFAULT_LOGIN_POLICY } from "./constants";

export type LoginAttempt = {
  succeeded: boolean;
  attemptedAt: Date;
};

export function loginLockoutUntil(
  attempts: LoginAttempt[],
  now: Date,
  policy = DEFAULT_LOGIN_POLICY,
) {
  const windowStart = now.getTime() - policy.windowMinutes * 60_000;
  const latestSuccess = attempts
    .filter((attempt) => attempt.succeeded && attempt.attemptedAt <= now)
    .reduce((latest, attempt) => Math.max(latest, attempt.attemptedAt.getTime()), 0);
  const failures = attempts.filter(
    (attempt) =>
      !attempt.succeeded &&
      attempt.attemptedAt.getTime() >= windowStart &&
      attempt.attemptedAt.getTime() > latestSuccess &&
      attempt.attemptedAt <= now,
  );

  if (failures.length < policy.maximumAttempts) return null;
  const latest = Math.max(...failures.map((attempt) => attempt.attemptedAt.getTime()));
  return new Date(latest + policy.lockoutMinutes * 60_000);
}

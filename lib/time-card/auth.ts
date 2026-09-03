import "server-only";
import { loginLockoutUntil, storedLoginLockIsCurrent } from "./rate-limit";
import { clearUserLoginState, findLoginUser, lockUser, recentLoginAttempts, recordLoginAttempt } from "./repository";
import { verifyPin } from "./security";
import { createDatabaseSession, requestLoginFingerprint } from "./session";

const GENERIC_LOGIN_ERROR = "That PIN wasn't recognized. Please try again.";
const TEMPORARY_DELAY_ERROR = "Please wait a moment and try again.";

export async function authenticate(loginIdentifier: string, pin: string) {
  const fingerprint = await requestLoginFingerprint(loginIdentifier);
  const attempts = await recentLoginAttempts(fingerprint.loginKeyHash, fingerprint.ipHash);
  const now = new Date();
  const attemptLockout = loginLockoutUntil(attempts, now);
  if (attemptLockout && attemptLockout > now) {
    return { ok: false as const, message: TEMPORARY_DELAY_ERROR };
  }

  const user = await findLoginUser(loginIdentifier);
  if (user?.lockedUntil && storedLoginLockIsCurrent(new Date(user.lockedUntil), now)) {
    return { ok: false as const, message: TEMPORARY_DELAY_ERROR };
  } else if (user?.lockedUntil) {
    await clearUserLoginState(user.id);
  }

  const valid = Boolean(user && await verifyPin(user.pinHash, pin));
  await recordLoginAttempt({ ...fingerprint, succeeded: valid, userId: user?.id });
  if (!valid || !user) {
    const updated = [...attempts, { succeeded: false, attemptedAt: new Date() }];
    const lockedUntil = loginLockoutUntil(updated, new Date());
    if (lockedUntil && user) await lockUser(user.id, lockedUntil);
    return { ok: false as const, message: lockedUntil ? TEMPORARY_DELAY_ERROR : GENERIC_LOGIN_ERROR };
  }

  await createDatabaseSession(user.id, user.role);
  return { ok: true as const, role: user.role };
}

import "server-only";
import { loginLockoutUntil } from "./rate-limit";
import { findLoginUser, lockUser, recentLoginAttempts, recordLoginAttempt } from "./repository";
import { verifyPin } from "./security";
import { createDatabaseSession, requestLoginFingerprint } from "./session";

const GENERIC_LOGIN_ERROR = "The selected name or PIN was not recognized.";

export async function authenticate(loginIdentifier: string, pin: string) {
  const fingerprint = await requestLoginFingerprint(loginIdentifier);
  const attempts = await recentLoginAttempts(fingerprint.loginKeyHash, fingerprint.ipHash);
  const beforeLookupLockout = loginLockoutUntil(attempts, new Date());
  if (beforeLookupLockout && beforeLookupLockout > new Date()) {
    return { ok: false as const, message: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const user = await findLoginUser(loginIdentifier);
  if (user?.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    return { ok: false as const, message: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const valid = Boolean(user && await verifyPin(user.pinHash, pin));
  await recordLoginAttempt({ ...fingerprint, succeeded: valid, userId: user?.id });
  if (!valid || !user) {
    const updated = [...attempts, { succeeded: false, attemptedAt: new Date() }];
    const lockedUntil = loginLockoutUntil(updated, new Date());
    if (lockedUntil && user) await lockUser(user.id, lockedUntil);
    return { ok: false as const, message: lockedUntil ? "Too many attempts. Please wait 15 minutes and try again." : GENERIC_LOGIN_ERROR };
  }

  await createDatabaseSession(user.id, user.role);
  return { ok: true as const, role: user.role };
}

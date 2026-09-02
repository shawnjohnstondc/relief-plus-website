import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { hash, verify } from "@node-rs/argon2";
import type { SessionIdentity, TimeCardRole } from "./types";

const ARGON_OPTIONS = {
  // @node-rs/argon2 declares Algorithm as an ambient const enum, which is not
  // compatible with this project's isolatedModules setting. Value 2 is Argon2id.
  algorithm: 2,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
  outputLen: 32,
} as const;

export async function hashPin(pin: string) {
  assertPin(pin);
  return hash(pin, ARGON_OPTIONS);
}

export async function verifyPin(pinHash: string, pin: string) {
  if (!/^\d{4}$/.test(pin)) return false;
  return verify(pinHash, pin, ARGON_OPTIONS);
}

export function assertPin(pin: string) {
  if (!/^\d{4}$/.test(pin)) {
    throw new Error("PIN must contain exactly four digits.");
  }
}

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function signSessionToken(token: string, secret: string) {
  if (secret.length < 32) throw new Error("Session HMAC secret is too short.");
  return createHmac("sha256", secret).update(token).digest("base64url");
}

export function serializeSessionToken(token: string, secret: string) {
  return `${token}.${signSessionToken(token, secret)}`;
}

export function parseSessionToken(value: string, secret: string) {
  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const token = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expected = signSessionToken(token, secret);
  return constantTimeEqual(signature, expected) ? token : null;
}

export function keyedIdentifierHash(value: string, secret: string) {
  if (secret.length < 32) throw new Error("Login HMAC secret is too short.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function constantTimeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function requireActiveSession(session: SessionIdentity | null) {
  if (!session?.active || session.expiresAt <= new Date()) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function requireRole(
  session: SessionIdentity | null,
  role: TimeCardRole,
) {
  const activeSession = requireActiveSession(session);
  if (activeSession.role !== role) throw new Error("Forbidden");
  return activeSession;
}

export function employeeScope(
  session: SessionIdentity | null,
  requestedEmployeeId?: string,
) {
  const activeSession = requireActiveSession(session);

  if (activeSession.role === "ADMIN") {
    if (!requestedEmployeeId) throw new Error("Employee is required.");
    return requestedEmployeeId;
  }

  if (requestedEmployeeId && requestedEmployeeId !== activeSession.userId) {
    throw new Error("Forbidden");
  }

  return activeSession.userId;
}

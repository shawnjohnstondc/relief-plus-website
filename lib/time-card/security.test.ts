import { describe, expect, it } from "vitest";
import { createSessionToken, employeeScope, hashPin, parseSessionToken, requireRole, serializeSessionToken, verifyPin } from "./security";
import type { SessionIdentity } from "./types";

function session(role: "ADMIN" | "EMPLOYEE", userId = "employee-1"): SessionIdentity {
  return {
    sessionId: "session-1",
    userId,
    firstName: "Test",
    name: "Test Employee",
    role,
    active: true,
    expiresAt: new Date(Date.now() + 60_000),
  };
}

describe("PIN authentication primitives", () => {
  it("authenticates the correct employee PIN", async () => {
    const pinHash = await hashPin("1234");
    expect(await verifyPin(pinHash, "1234")).toBe(true);
  });

  it("rejects an invalid PIN", async () => {
    const pinHash = await hashPin("1234");
    expect(await verifyPin(pinHash, "9999")).toBe(false);
  });

  it.each(["123", "12345", "12a4", ""])("rejects malformed PIN %j", async (pin) => {
    const pinHash = await hashPin("1234");
    expect(await verifyPin(pinHash, pin)).toBe(false);
  });
});

describe("signed opaque sessions", () => {
  const secret = "a".repeat(32);
  it("round trips a signed high-entropy token", () => {
    const token = createSessionToken();
    expect(token.length).toBeGreaterThanOrEqual(40);
    expect(parseSessionToken(serializeSessionToken(token, secret), secret)).toBe(token);
  });
  it("rejects a changed token", () => {
    const value = serializeSessionToken(createSessionToken(), secret);
    expect(parseSessionToken(`x${value}`, secret)).toBeNull();
  });
  it("rejects a changed signature", () => {
    const value = serializeSessionToken(createSessionToken(), secret);
    expect(parseSessionToken(`${value}x`, secret)).toBeNull();
  });
  it("rejects an unsigned cookie", () => expect(parseSessionToken("plain", secret)).toBeNull());
});

describe("server-side authorization", () => {
  it("allows an admin session through the admin boundary", () => {
    expect(requireRole(session("ADMIN"), "ADMIN").role).toBe("ADMIN");
  });

  it("blocks an employee from the admin boundary", () => {
    expect(() => requireRole(session("EMPLOYEE"), "ADMIN")).toThrow("Forbidden");
  });

  it("derives employee scope from the session", () => {
    expect(employeeScope(session("EMPLOYEE"))).toBe("employee-1");
  });

  it("blocks an employee from another employee's records", () => {
    expect(() => employeeScope(session("EMPLOYEE"), "employee-2")).toThrow(
      "Forbidden",
    );
  });
});

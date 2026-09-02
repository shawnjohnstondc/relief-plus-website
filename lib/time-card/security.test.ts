import { describe, expect, it } from "vitest";
import { employeeScope, hashPin, requireRole, verifyPin } from "./security";
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

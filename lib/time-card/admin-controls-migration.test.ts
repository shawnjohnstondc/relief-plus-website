import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync("supabase/migrations/20260902135631_time_card_admin_controls.sql", "utf8");

describe("additive time-card admin controls migration", () => {
  it("stores effective-dated hourly rates as bounded integer cents", () => {
    expect(migration).toContain("create table public.employee_pay_rates");
    expect(migration).toContain("hourly_rate_cents integer not null");
    expect(migration).toContain("effective_date date not null");
    expect(migration).toContain("hourly_rate_cents > 0");
  });

  it("protects the table from public API roles", () => {
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("revoke all on table public.employee_pay_rates from anon, authenticated");
  });

  it("does not alter or drop the initialized time-card tables", () => {
    expect(migration).not.toMatch(/drop\s+(table|column)/i);
    expect(migration).not.toMatch(/truncate/i);
  });
});

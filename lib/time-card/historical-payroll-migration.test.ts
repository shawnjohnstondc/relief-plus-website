import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync("supabase/migrations/20260902190853_historical_payroll_summaries.sql", "utf8");

describe("additive historical payroll migration", () => {
  it("stores exact source precision separately from live punches", () => {
    expect(migration).toContain("create table public.historical_payroll_summaries");
    expect(migration).toContain("worked_hundredths integer not null");
    expect(migration).toContain("estimated_gross_cents integer not null");
    expect(migration).not.toContain("insert into public.time_entries");
  });

  it("enforces idempotent employee-period and source-file identities", () => {
    expect(migration).toContain("historical_payroll_employee_period_unique");
    expect(migration).toContain("historical_payroll_import_source_hash_unique");
  });

  it("keeps both new tables unavailable to public API roles", () => {
    expect(migration.match(/enable row level security/g)).toHaveLength(2);
    expect(migration).toContain("revoke all on table public.historical_payroll_summaries from anon, authenticated");
    expect(migration).toContain("revoke all on table public.historical_payroll_import_batches from anon, authenticated");
  });

  it("is additive and never resets current payroll data", () => {
    expect(migration).not.toMatch(/drop\s+(table|column)/i);
    expect(migration).not.toMatch(/truncate/i);
    expect(migration).not.toMatch(/delete\s+from/i);
    expect(migration).not.toMatch(/update\s+(public\.)?(time_entries|paid_time_entries)/i);
  });
});

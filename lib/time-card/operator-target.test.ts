import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assertTimeCardConfirmation,
  parseTimeCardTargetArguments,
  prepareTimeCardOperatorTarget,
  TIME_CARD_PREVIEW_PROJECT_REF,
  timeCardConfirmationPhrase,
  validateTimeCardDatabaseTarget,
} from "./operator-target";

const productionRef = "abcdefghijklmnopqrst";
const poolerUri = (projectRef: string) => `postgresql://postgres.${projectRef}:hidden-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

describe("time-card operator target selection", () => {
  it("rejects a missing target", () => {
    expect(() => parseTimeCardTargetArguments([])).toThrow(/explicit --target/);
  });

  it("rejects an invalid target", () => {
    expect(() => parseTimeCardTargetArguments(["--target", "staging"])).toThrow(/exactly preview or production/);
  });

  it("accepts the known Preview URI only for Preview", () => {
    expect(validateTimeCardDatabaseTarget({ target: "preview", databaseUrl: poolerUri(TIME_CARD_PREVIEW_PROJECT_REF), expectedProjectRef: undefined }).projectRef).toBe(TIME_CARD_PREVIEW_PROJECT_REF);
    expect(() => validateTimeCardDatabaseTarget({ target: "production", databaseUrl: poolerUri(TIME_CARD_PREVIEW_PROJECT_REF), expectedProjectRef: productionRef })).toThrow(/Preview database is forbidden/);
  });

  it("rejects an unexpected Preview URI", () => {
    expect(() => validateTimeCardDatabaseTarget({ target: "preview", databaseUrl: poolerUri(productionRef), expectedProjectRef: undefined })).toThrow(/does not match/);
  });

  it("accepts only the explicitly configured Production project", () => {
    expect(validateTimeCardDatabaseTarget({ target: "production", databaseUrl: poolerUri(productionRef), expectedProjectRef: productionRef }).projectRef).toBe(productionRef);
    expect(() => validateTimeCardDatabaseTarget({ target: "production", databaseUrl: poolerUri("zyxwvutsrqponmlkjihg"), expectedProjectRef: productionRef })).toThrow(/does not match/);
  });

  it("requires a Production project reference", () => {
    expect(() => validateTimeCardDatabaseTarget({ target: "production", databaseUrl: poolerUri(productionRef), expectedProjectRef: undefined })).toThrow(/EXPECTED_PROJECT_REF is required/);
  });

  it("rejects malformed and non-pooler database URLs without echoing them", () => {
    expect(() => validateTimeCardDatabaseTarget({ target: "preview", databaseUrl: "not a secret url", expectedProjectRef: undefined })).toThrow("TIME_CARD_DATABASE_URL is not a valid PostgreSQL Transaction Pooler URI.");
    expect(() => validateTimeCardDatabaseTarget({ target: "preview", databaseUrl: `postgresql://postgres.${TIME_CARD_PREVIEW_PROJECT_REF}:hidden@db.${TIME_CARD_PREVIEW_PROJECT_REF}.supabase.co:5432/postgres`, expectedProjectRef: undefined })).toThrow(/port 6543/);
  });

  it("preserves remaining non-target arguments", () => {
    expect(parseTimeCardTargetArguments(["--target", "production", "--dry-run", "one.csv"])).toEqual({ target: "production", remaining: ["--dry-run", "one.csv"] });
  });
});

describe("time-card destructive confirmations", () => {
  it("defines exact Preview and Production phrases", () => {
    expect(timeCardConfirmationPhrase("preview", "initialize")).toBe("INITIALIZE PREVIEW");
    expect(timeCardConfirmationPhrase("production", "initialize")).toBe("INITIALIZE PRODUCTION");
    expect(timeCardConfirmationPhrase("preview", "import-history")).toBe("IMPORT HISTORICAL SUMMARIES TO PREVIEW");
    expect(timeCardConfirmationPhrase("production", "import-history")).toBe("IMPORT HISTORICAL SUMMARIES TO PRODUCTION");
  });

  it("accepts only the phrase for the selected environment", () => {
    expect(() => assertTimeCardConfirmation({ target: "preview", action: "initialize", confirmation: "INITIALIZE PREVIEW" })).not.toThrow();
    expect(() => assertTimeCardConfirmation({ target: "production", action: "initialize", confirmation: "INITIALIZE PRODUCTION" })).not.toThrow();
    expect(() => assertTimeCardConfirmation({ target: "production", action: "initialize", confirmation: "INITIALIZE PREVIEW" })).toThrow(/did not exactly match/);
    expect(() => assertTimeCardConfirmation({ target: "preview", action: "import-history", confirmation: "IMPORT HISTORICAL SUMMARIES TO PRODUCTION" })).toThrow(/did not exactly match/);
  });
});

describe("time-card scripts fail before database access", () => {
  it("validates the target before constructing a database client", () => {
    for (const file of ["scripts/initialize-time-card.mjs", "scripts/import-historical-payroll.mjs"]) {
      const source = readFileSync(file, "utf8");
      expect(source.indexOf("prepareTimeCardOperatorTarget({")).toBeGreaterThan(-1);
      expect(source.indexOf("prepareTimeCardOperatorTarget({")).toBeLessThan(source.indexOf("const sql = postgres("));
    }
  });

  it("fails closed without invoking a database action", () => {
    let mutationAttempted = false;
    expect(() => {
      prepareTimeCardOperatorTarget({ args: ["--target", "production"], environment: { TIME_CARD_DATABASE_URL: poolerUri(TIME_CARD_PREVIEW_PROJECT_REF), TIME_CARD_EXPECTED_PROJECT_REF: productionRef }, action: "initialize" });
      mutationAttempted = true;
    }).toThrow(/Preview database is forbidden/);
    expect(mutationAttempted).toBe(false);
  });
});

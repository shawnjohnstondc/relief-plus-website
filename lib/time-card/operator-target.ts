export const TIME_CARD_PREVIEW_PROJECT_REF = "dxtciwmxkeiewhdjrbju";

export type TimeCardOperatorTarget = "preview" | "production";
export type TimeCardOperatorAction = "initialize" | "import-history";

type OperatorEnvironment = Record<string, string | undefined>;

export function parseTimeCardTargetArguments(args: string[]): {
  target: TimeCardOperatorTarget;
  remaining: string[];
} {
  const indexes = args.flatMap((argument, index) => argument === "--target" ? [index] : []);
  if (indexes.length !== 1) {
    throw new Error("Exactly one explicit --target preview|production argument is required.");
  }

  const index = indexes[0];
  const rawTarget = args[index + 1];
  if (rawTarget !== "preview" && rawTarget !== "production") {
    throw new Error("Time-card target must be exactly preview or production.");
  }

  return {
    target: rawTarget,
    remaining: args.filter((_, argumentIndex) => argumentIndex !== index && argumentIndex !== index + 1),
  };
}

function configuredProjectReference(target: TimeCardOperatorTarget, configured: string | undefined) {
  const value = configured?.trim();
  if (target === "preview") {
    if (value && value !== TIME_CARD_PREVIEW_PROJECT_REF) {
      throw new Error("Configured project reference does not match the approved Preview project.");
    }
    return TIME_CARD_PREVIEW_PROJECT_REF;
  }

  if (!value) {
    throw new Error("TIME_CARD_EXPECTED_PROJECT_REF is required for a Production operation.");
  }
  if (!/^[a-z0-9]{20}$/.test(value)) {
    throw new Error("TIME_CARD_EXPECTED_PROJECT_REF is not a valid Supabase project reference.");
  }
  if (value === TIME_CARD_PREVIEW_PROJECT_REF) {
    throw new Error("The known Preview project cannot be used for a Production operation.");
  }
  return value;
}

export function validateTimeCardDatabaseTarget(input: {
  target: TimeCardOperatorTarget;
  databaseUrl: string | undefined;
  expectedProjectRef: string | undefined;
}) {
  const expectedProjectRef = configuredProjectReference(input.target, input.expectedProjectRef);
  if (!input.databaseUrl) throw new Error("TIME_CARD_DATABASE_URL is required.");

  let url: URL;
  try {
    url = new URL(input.databaseUrl);
  } catch {
    throw new Error("TIME_CARD_DATABASE_URL is not a valid PostgreSQL Transaction Pooler URI.");
  }

  let username: string;
  try {
    username = decodeURIComponent(url.username);
  } catch {
    throw new Error("TIME_CARD_DATABASE_URL contains an invalid encoded username.");
  }

  const usernameMatch = /^postgres\.([a-z0-9]{20})$/.exec(username);
  const projectRef = usernameMatch?.[1];
  const validPooler = (url.protocol === "postgres:" || url.protocol === "postgresql:")
    && url.hostname.endsWith(".pooler.supabase.com")
    && url.port === "6543"
    && url.pathname === "/postgres"
    && Boolean(url.password)
    && Boolean(projectRef);
  if (!validPooler || !projectRef) {
    throw new Error("TIME_CARD_DATABASE_URL must be a complete Supabase Transaction Pooler URI on port 6543.");
  }

  if (input.target === "production" && projectRef === TIME_CARD_PREVIEW_PROJECT_REF) {
    throw new Error("The known Preview database is forbidden for a Production operation.");
  }
  if (projectRef !== expectedProjectRef) {
    throw new Error(`Database project reference does not match the expected ${input.target} target.`);
  }

  return { projectRef, expectedProjectRef };
}

export function timeCardConfirmationPhrase(target: TimeCardOperatorTarget, action: TimeCardOperatorAction) {
  const environment = target.toUpperCase();
  return action === "initialize"
    ? `INITIALIZE ${environment}`
    : `IMPORT HISTORICAL SUMMARIES TO ${environment}`;
}

export function assertTimeCardConfirmation(input: {
  target: TimeCardOperatorTarget;
  action: TimeCardOperatorAction;
  confirmation: string;
}) {
  const expected = timeCardConfirmationPhrase(input.target, input.action);
  if (input.confirmation !== expected) {
    throw new Error("Confirmation did not exactly match the selected target. Nothing was changed.");
  }
}

export function redactTimeCardProjectReference(projectRef: string) {
  return `${projectRef.slice(0, 4)}…${projectRef.slice(-4)}`;
}

export function prepareTimeCardOperatorTarget(input: {
  args: string[];
  environment: OperatorEnvironment;
  action: TimeCardOperatorAction;
}) {
  const parsed = parseTimeCardTargetArguments(input.args);
  const validated = validateTimeCardDatabaseTarget({
    target: parsed.target,
    databaseUrl: input.environment.TIME_CARD_DATABASE_URL,
    expectedProjectRef: input.environment.TIME_CARD_EXPECTED_PROJECT_REF,
  });

  return {
    ...parsed,
    ...validated,
    databaseUrl: input.environment.TIME_CARD_DATABASE_URL as string,
    confirmationPhrase: timeCardConfirmationPhrase(parsed.target, input.action),
    redactedProjectRef: redactTimeCardProjectReference(validated.projectRef),
  };
}

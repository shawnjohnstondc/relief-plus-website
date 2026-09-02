import "server-only";
import postgres from "postgres";
import { timeCardConfig } from "./config";

type SqlClient = ReturnType<typeof postgres>;

const globalDatabase = globalThis as typeof globalThis & {
  reliefPlusTimeCardSql?: SqlClient;
};

export function timeCardDatabase() {
  if (!globalDatabase.reliefPlusTimeCardSql) {
    globalDatabase.reliefPlusTimeCardSql = postgres(timeCardConfig().databaseUrl, {
      max: 5,
      prepare: false,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl: "require",
      transform: postgres.camel,
    });
  }

  return globalDatabase.reliefPlusTimeCardSql;
}

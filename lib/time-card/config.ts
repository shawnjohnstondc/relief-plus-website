import "server-only";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required server configuration: ${name}`);
  return value;
}

export function timeCardConfig() {
  return {
    databaseUrl: required("TIME_CARD_DATABASE_URL"),
    sessionHmacSecret: required("TIME_CARD_SESSION_HMAC_SECRET"),
    loginHmacSecret: required("TIME_CARD_LOGIN_HMAC_SECRET"),
  };
}

import "server-only";
import { cookies, headers } from "next/headers";
import { timeCardConfig } from "./config";
import {
  ADMIN_SESSION_HOURS,
  EMPLOYEE_SESSION_HOURS,
  TIME_CARD_SESSION_COOKIE,
} from "./constants";
import { timeCardDatabase } from "./database";
import {
  createSessionToken,
  hashSessionToken,
  keyedIdentifierHash,
  parseSessionToken,
  serializeSessionToken,
} from "./security";
import type { SessionIdentity, TimeCardRole } from "./types";

function requestFingerprint(headerList: Headers, secret: string) {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headerList.get("x-real-ip") || "unknown";
  const userAgent = headerList.get("user-agent") || "unknown";
  return {
    ip,
    ipHash: keyedIdentifierHash(`ip:${ip}`, secret),
    userAgentHash: keyedIdentifierHash(`ua:${userAgent}`, secret),
  };
}

export async function createDatabaseSession(userId: string, role: TimeCardRole) {
  const config = timeCardConfig();
  const sql = timeCardDatabase();
  const token = createSessionToken();
  const absoluteHours = role === "ADMIN" ? ADMIN_SESSION_HOURS : EMPLOYEE_SESSION_HOURS;
  const expiresAt = new Date(Date.now() + absoluteHours * 3_600_000);
  const fingerprint = requestFingerprint(await headers(), config.loginHmacSecret);

  await sql`
    insert into time_card_sessions
      (user_id, token_hash, expires_at, user_agent_hash, ip_hash)
    values
      (${userId}, ${hashSessionToken(token)}, ${expiresAt},
       ${fingerprint.userAgentHash}, ${fingerprint.ipHash})
  `;

  (await cookies()).set(TIME_CARD_SESSION_COOKIE, serializeSessionToken(token, config.sessionHmacSecret), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/time-card",
    expires: expiresAt,
    priority: "high",
  });
}

export async function getSession(): Promise<SessionIdentity | null> {
  const config = timeCardConfig();
  const value = (await cookies()).get(TIME_CARD_SESSION_COOKIE)?.value;
  if (!value) return null;
  const token = parseSessionToken(value, config.sessionHmacSecret);
  if (!token) return null;
  const sql = timeCardDatabase();
  const rows = await sql<{
    sessionId: string; userId: string; name: string; role: TimeCardRole;
    active: boolean; expiresAt: Date; userAgentHash: string | null;
  }[]>`
    select s.id as session_id, u.id as user_id, u.name, u.role, u.active,
      s.expires_at, s.user_agent_hash
    from time_card_sessions s
    join time_card_users u on u.id = s.user_id
    where s.token_hash = ${hashSessionToken(token)}
      and s.revoked_at is null and s.expires_at > now()
      and s.last_seen_at > now() - interval '30 minutes'
      and u.active = true
    limit 1
  `;
  const row = rows[0];
  if (!row) return null;
  const fingerprint = requestFingerprint(await headers(), config.loginHmacSecret);
  if (row.userAgentHash && row.userAgentHash !== fingerprint.userAgentHash) return null;
  await sql`update time_card_sessions set last_seen_at = now() where id = ${row.sessionId}`;
  return {
    ...row,
    firstName: row.name.split(/\s+/)[0] || row.name,
    expiresAt: new Date(row.expiresAt),
  };
}

export async function revokeCurrentSession() {
  const config = timeCardConfig();
  const cookieStore = await cookies();
  const value = cookieStore.get(TIME_CARD_SESSION_COOKIE)?.value;
  const token = value ? parseSessionToken(value, config.sessionHmacSecret) : null;
  if (token) {
    await timeCardDatabase()`
      update time_card_sessions set revoked_at = now()
      where token_hash = ${hashSessionToken(token)} and revoked_at is null
    `;
  }
  cookieStore.delete(TIME_CARD_SESSION_COOKIE);
}

export async function requestLoginFingerprint(loginIdentifier: string) {
  const secret = timeCardConfig().loginHmacSecret;
  const fingerprint = requestFingerprint(await headers(), secret);
  return {
    loginKeyHash: keyedIdentifierHash(`login:${loginIdentifier}`, secret),
    ipHash: fingerprint.ipHash,
  };
}

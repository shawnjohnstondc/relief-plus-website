import process from "node:process";
import readline from "node:readline";
import postgres from "postgres";
import { hash } from "@node-rs/argon2";
import { assertTimeCardConfirmation, prepareTimeCardOperatorTarget } from "../lib/time-card/operator-target.ts";

const operator = prepareTimeCardOperatorTarget({ args: process.argv.slice(2), environment: process.env, action: "initialize" });
if (operator.remaining.length) throw new Error("Usage: npm run time-card:initialize -- --target preview|production");
if (!process.stdin.isTTY) throw new Error("Initialization requires a private interactive terminal.");
process.stdout.write(`Validated ${operator.target} target: Supabase project ${operator.redactedProjectRef}.\n`);

const users = [
  { loginIdentifier: "lisa-bernard", name: "Lisa Bernard", role: "EMPLOYEE" },
  { loginIdentifier: "jeanne-saucier", name: "Jeanne Saucier", role: "EMPLOYEE" },
  { loginIdentifier: "kelci-richard", name: "Kelci Richard", role: "EMPLOYEE" },
  { loginIdentifier: "shawn-d-johnston", name: "Shawn D. Johnston, D.C.", role: "ADMIN" },
];

function ask(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(prompt, (answer) => { rl.close(); resolve(answer.trim()); }));
}

function secretPrompt(prompt) {
  return new Promise((resolve, reject) => {
    process.stdout.write(prompt);
    const chars = [];
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const cleanup = () => { process.stdin.setRawMode(false); process.stdin.pause(); process.stdin.removeListener("data", onData); process.stdout.write("\n"); };
    const onData = (key) => {
      if (key === "\u0003") { cleanup(); reject(new Error("Initialization cancelled.")); return; }
      if (key === "\r" || key === "\n") { cleanup(); resolve(chars.join("")); return; }
      if (key === "\u007f") { chars.pop(); return; }
      if (/\d/.test(key) && chars.length < 4) chars.push(key);
    };
    process.stdin.on("data", onData);
  });
}

const confirmation = await ask(`Initialize the NEW Relief Plus ${operator.target} time-card database? Type ${operator.confirmationPhrase}: `);
assertTimeCardConfirmation({ target: operator.target, action: "initialize", confirmation });

const prepared = [];
for (const user of users) {
  const pin = await secretPrompt(`New four-digit PIN for ${user.name}: `);
  const repeated = await secretPrompt(`Repeat PIN for ${user.name}: `);
  if (!/^\d{4}$/.test(pin) || pin !== repeated) throw new Error(`PIN validation failed for ${user.name}. Nothing was changed.`);
  prepared.push({ ...user, pinHash: await hash(pin, { algorithm: 2, memoryCost: 19_456, timeCost: 2, parallelism: 1, outputLen: 32 }) });
}

const sql = postgres(operator.databaseUrl, { max: 1, prepare: false, ssl: "require", transform: postgres.camel });
try {
  await sql.begin(async (tx) => {
    const state = await tx`select value from app_settings where key = 'initialization_complete' for update`;
    const count = await tx`select count(*)::int as count from time_card_users`;
    if (state.length || count[0].count > 0) throw new Error("Time-card users already exist. Initialization is permanently closed.");
    for (const user of prepared) {
      await tx`insert into time_card_users (login_identifier, name, pin_hash, role) values (${user.loginIdentifier}, ${user.name}, ${user.pinHash}, ${user.role})`;
    }
    await tx`insert into app_settings (key, value) values ('initialization_complete', ${tx.json({ completedAt: new Date().toISOString(), userCount: prepared.length })})`;
  });
  process.stdout.write("Initialization completed: 3 hourly employees and 1 non-hourly administrator created.\n");
} finally {
  await sql.end();
}

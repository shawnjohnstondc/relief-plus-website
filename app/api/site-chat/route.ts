import { createHash } from "node:crypto";
import { generateText, Output } from "ai";
import { answerInstructions, modelAnswerSchema, requestSchema, retrieveContext, validateAnswer } from "@/lib/site-answers/grounding";
import type { AnswerIndex } from "@/lib/site-answers/search";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";
export const maxDuration = 45;

// Best-effort per-instance abuse protection. No questions or raw IPs are stored.
// These counters are not a global billing limit across serverless instances.
const limits = new Map<string, { count: number; until: number }>();
let active = 0;
function limited(request: Request) {
  const now = Date.now();
  for (const [key, value] of limits) if (value.until < now) limits.delete(key);
  const ip = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const count = limits.get(key) ?? { count: 0, until: now + 60_000 };
  if (count.count >= 8 || active >= 8 || limits.size >= 10000) return true;
  count.count++;
  limits.set(key, count);
  return false;
}

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin && origin !== siteConfig.url) return json({ error: "Request not allowed." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "JSON required." }, 415);
  if (Number(request.headers.get("content-length")) > 18000) return json({ error: "Please shorten your question." }, 413);
  // Enforce the real body size as well, including chunked requests.
  const reader = request.body?.getReader();
  if (!reader) return json({ error: "Please enter a question." }, 400);
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 18000) { await reader.cancel(); return json({ error: "Please shorten your question." }, 413); }
    chunks.push(value);
  }
  let input;
  try { input = requestSchema.parse(JSON.parse(Buffer.concat(chunks).toString("utf8"))); }
  catch { return json({ error: "Please enter a question of 600 characters or fewer." }, 400); }
  if (limited(request)) return json({ error: "Please wait a minute before asking another question." }, 429);
  active++;
  try {
    // The only retrievable source is our published build-generated index.
    // Never fetch a URL supplied by a visitor or a model.
    const response = await fetch(`${siteConfig.url}/site-answers.json`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("SITE_CONTENT_UNAVAILABLE");
    const index: AnswerIndex = await response.json();
    if (index.version !== 1 || !Array.isArray(index.chunks)) throw new Error("SITE_CONTENT_INVALID");
    const context = retrieveContext(index, input.question, input.history.map(h => h.question));
    const { output } = await generateText({
      model: process.env.SITE_CHAT_MODEL || "openai/gpt-6.1-sol",
      system: answerInstructions,
      prompt: JSON.stringify({ WEBSITE_PASSAGES: context, conversation: input.history, latestQuestion: input.question }),
      output: Output.object({ schema: modelAnswerSchema }),
      maxOutputTokens: 2200,
      reasoning: "low",
      maxRetries: 1,
      abortSignal: AbortSignal.any([request.signal, AbortSignal.timeout(30000)]),
      providerOptions: { openai: { store: false }, gateway: { models: ["openai/gpt-6-luna"] } },
    });
    return json(validateAnswer(output, context));
  } catch (error) {
    // Log only a classification; provider errors can otherwise include prompts.
    console.error("Site chat unavailable", error instanceof Error ? error.name : "UnknownError");
    const kind = error instanceof Error ? error.name : "UnknownError";
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    const code = /credits|billing|payment|balance/.test(message) ? "AI_BILLING_REQUIRED"
      : /oidc|api.key|unauthorized|authentication|credential/.test(message) || kind.includes("Authentication") || kind.includes("LoadAPIKey") ? "AI_AUTH_REQUIRED"
      : kind.includes("Timeout") || kind.includes("Abort") ? "AI_TIMEOUT"
      : kind.includes("NoObject") || kind.includes("TypeValidation") ? "AI_OUTPUT_INVALID"
      : error instanceof Error && error.message.startsWith("SITE_CONTENT_") ? "SITE_CONTENT_UNAVAILABLE"
      : kind.replace(/[^a-zA-Z_]/g, "").slice(0, 60);
    return json({ error: "Chat is temporarily unavailable. Please try again shortly.", code }, 503);
  } finally { active--; }
}

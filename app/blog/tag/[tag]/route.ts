const allowedTags = new Set([
  "accupunture",
  "carencro",
  "chiropractor",
  "dizzines",
  "frozen+shoulder",
  "range+of+motion",
  "team",
  "vertigo",
]);

const publicHosts = new Set(["myreliefplus.com", "www.myreliefplus.com"]);

function configuredOrigin() {
  const value = process.env.LEGACY_PUBLIC_ORIGIN;

  if (!value) return null;

  const url = new URL(value);

  if (url.protocol !== "https:" || publicHosts.has(url.hostname)) {
    throw new Error(
      "LEGACY_PUBLIC_ORIGIN must be an HTTPS origin outside the public Relief Plus hostname.",
    );
  }

  return url.origin;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> },
) {
  const { tag } = await params;

  if (!allowedTags.has(tag)) {
    return new Response("Not found.", { status: 404 });
  }

  const origin = configuredOrigin();

  if (!origin) {
    return new Response("Legacy content origin is not configured.", {
      status: 503,
    });
  }

  let upstream: Response;

  try {
    upstream = await fetch(`${origin}/blog/tag/${tag}`, {
      cache: "no-store",
      headers: { Accept: "text/html,application/xhtml+xml" },
    });
  } catch {
    return new Response("Legacy content is temporarily unavailable.", {
      status: 502,
    });
  }

  if (!upstream.ok) {
    return new Response("Legacy content is temporarily unavailable.", {
      status: upstream.status === 429 ? 429 : 502,
    });
  }

  return new Response(await upstream.text(), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": upstream.headers.get("content-type") ?? "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

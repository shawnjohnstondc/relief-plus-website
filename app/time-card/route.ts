const publicHosts = new Set(["myreliefplus.com", "www.myreliefplus.com"]);

function configuredOrigin() {
  const value = process.env.LEGACY_TIMECARD_ORIGIN;

  if (!value) {
    return null;
  }

  const url = new URL(value);

  if (url.protocol !== "https:" || publicHosts.has(url.hostname)) {
    throw new Error(
      "LEGACY_TIMECARD_ORIGIN must be an HTTPS origin outside the public Relief Plus hostname.",
    );
  }

  return url.origin;
}

function protectedHeaders(contentType = "text/plain; charset=utf-8") {
  return {
    "Cache-Control": "private, no-store, max-age=0",
    "Content-Type": contentType,
    "Referrer-Policy": "same-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
  };
}

export async function GET() {
  const origin = configuredOrigin();

  if (!origin) {
    return new Response("Staff time card is not configured.", {
      status: 503,
      headers: protectedHeaders(),
    });
  }

  let upstream: Response;

  try {
    upstream = await fetch(`${origin}/time-card`, {
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } catch {
    return new Response("Staff time card is temporarily unavailable.", {
      status: 502,
      headers: protectedHeaders(),
    });
  }

  if (!upstream.ok) {
    return new Response("Staff time card is temporarily unavailable.", {
      status: 502,
      headers: protectedHeaders(),
    });
  }

  const contentType = upstream.headers.get("content-type") ?? "text/html; charset=utf-8";
  let html = await upstream.text();

  if (!/<meta\s+name=["']robots["']/i.test(html)) {
    html = html.replace(
      /<head(\s[^>]*)?>/i,
      (head) => `${head}<meta name="robots" content="noindex, nofollow" />`,
    );
  }

  const headers = new Headers(protectedHeaders(contentType));
  const contentSecurityPolicy = upstream.headers.get("content-security-policy");
  const frameOptions = upstream.headers.get("x-frame-options");

  if (contentSecurityPolicy) headers.set("Content-Security-Policy", contentSecurityPolicy);
  if (frameOptions) headers.set("X-Frame-Options", frameOptions);

  return new Response(html, {
    status: 200,
    headers,
  });
}

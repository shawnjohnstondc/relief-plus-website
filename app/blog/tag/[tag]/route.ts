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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> },
) {
  const { tag } = await params;

  if (!allowedTags.has(tag)) {
    return new Response("Not found.", { status: 404 });
  }

  return new Response("This retired tag archive is no longer available.", {
    status: 410,
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

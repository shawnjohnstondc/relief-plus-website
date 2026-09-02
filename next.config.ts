import type { NextConfig } from "next";

const publicHosts = new Set(["myreliefplus.com", "www.myreliefplus.com"]);

const legacyContinuityPaths = [
  "/invisared-weight-loss-lafayette",
  "/blog/car-accident-injury-treatment-in-lafayette-la-what-to-do-immediately-and-why-waiting-can-make-it-worse",
  "/blog/whiplash-treatment-in-lafayette-la-symptoms-causes-and-how-to-recover-faster",
  "/blog/shoulder-pain-treatment-in-lafayette-la-why-it-wont-go-away-and-what-actually-helps",
  "/blog/knee-pain-treatment-in-lafayette-la-causes-solutions-and-when-to-get-help",
  "/blog/sciatica-treatment-in-lafayette-la-how-to-get-relief-fast-and-what-actually-works",
  "/blog/when-to-see-a-chiropractor-in-lafayette-la-signs-you-shouldnt-ignore",
  "/blog/back-pain-treatment-in-lafayette-la-what-actually-works-and-why-most-treatments-fail",
  "/blog/beyond-the-adjustment-why-carencros-industrial-athletes-trust-relief-plus-for-total-recovery",
  "/blog/rediscovering-primal-movement-patterns-for-modern-wellness",
  "/blog/relieving-tension-headaches-the-chiropractic-approach",
  "/blog/treating-plantar-fasciitis-through-dry-needling-efficacy-and-mechanism",
  "/blog/lipolaser-understanding-the-effectiveness-of-targeted-fat-loss",
  "/blog/treating-vertigo-with-acupuncture-a-holistic-approach",
  "/blog/team",
] as const;

function configuredLegacyPublicOrigin() {
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

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/time-card/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "Referrer-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/hippa-privacy",
        destination: "/hipaa-notice-of-privacy-practices",
        statusCode: 301,
      },
      {
        source: "/privacy-policy-3",
        destination: "/good-faith-estimate",
        statusCode: 301,
      },
      {
        source: "/faqs-1",
        destination: "/faq-lafayette",
        statusCode: 301,
      },
      {
        source: "/new-dropdown",
        destination: "/chiropractic-adjustments-lafayette",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    const origin = configuredLegacyPublicOrigin();

    return {
      afterFiles: origin
        ? legacyContinuityPaths.map((source) => ({
            source,
            destination: `${origin}${source.replaceAll("\\", "")}`,
          }))
        : [],
      beforeFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;

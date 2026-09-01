import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/time-card",
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
};

export default nextConfig;

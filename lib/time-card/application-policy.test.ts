import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

describe("staff route privacy and SEO policy", () => {
  it("marks the entire staff route tree noindex and nofollow", () => {
    const layout = read("app/time-card/layout.tsx");
    const config = read("next.config.ts");
    expect(layout).toContain("index: false");
    expect(layout).toContain("follow: false");
    expect(config).toContain('source: "/time-card/:path*"');
    expect(config).toContain("noindex, nofollow");
  });

  it("keeps staff routes out of the sitemap", () => {
    expect(read("app/sitemap.ts")).not.toMatch(/path:\s*["']\/time-card/);
  });

  it("suppresses public MedicalBusiness data on staff routes", () => {
    const rootLayout = read("app/layout.tsx");
    const staffLayout = read("app/time-card/layout.tsx");
    expect(rootLayout).not.toContain("medicalBusinessJsonLd");
    expect(staffLayout).not.toContain("JsonLd");
    expect(staffLayout).not.toContain("MedicalBusiness");
  });
});

describe("server authority and secret boundaries", () => {
  it("uses database now() for employee clock mutations", () => {
    const repository = read("lib/time-card/repository.ts");
    expect(repository).toMatch(/values \(\$\{employeeId\}, now\(\), 'EMPLOYEE'/);
    expect(repository).toMatch(/set clock_out = now\(\)/);
  });

  it("keeps runtime secrets in a server-only module without NEXT_PUBLIC variables", () => {
    const config = read("lib/time-card/config.ts");
    expect(config).toContain('import "server-only"');
    expect(config).not.toContain("NEXT_PUBLIC_");
  });

  it("never seeds plaintext PINs", () => {
    const initializer = read("scripts/initialize-time-card.mjs");
    expect(initializer).not.toMatch(/pin:\s*["']\d{4}/i);
    expect(initializer).toContain("setRawMode(true)");
  });
});

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/chiropractic-adjustments-lafayette", priority: 0.9 },
    { path: "/physical-therapy-lafayette", priority: 0.9 },
    { path: "/regenerative-cellular-therapy-lafayette", priority: 0.9 },
    { path: "/prp-therapy-lafayette", priority: 0.8 },
    { path: "/ozone-injection-therapy-lafayette", priority: 0.8 },
    { path: "/trigger-point-injections-lafayette", priority: 0.8 },
    { path: "/dry-needling-lafayette", priority: 0.8 },
    { path: "/class-iv-laser-therapy-lafayette", priority: 0.8 },
    { path: "/shockwave-therapy-lafayette", priority: 0.8 },
  ] as const;

  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/chiropractic-adjustments-lafayette", priority: 0.9 },
    { path: "/physical-therapy-lafayette", priority: 0.9 },
    { path: "/regenerative-cellular-therapy-lafayette", priority: 0.9 },
  ] as const;

  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}

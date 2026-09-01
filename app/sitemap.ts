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
    { path: "/chiropractor-carencro-la", priority: 0.9 },
    { path: "/conditions-we-treat", priority: 0.9 },
    { path: "/back-pain-lafayette", priority: 0.8 },
    { path: "/neck-pain-lafayette", priority: 0.8 },
    { path: "/sciatica-treatment-lafayette", priority: 0.8 },
    { path: "/herniated-disc-lafayette", priority: 0.8 },
    { path: "/pinched-nerve-lafayette", priority: 0.8 },
    { path: "/knee-osteoarthritis-lafayette", priority: 0.8 },
    { path: "/rotator-cuff-pain-lafayette", priority: 0.8 },
    { path: "/tmj-treatment-lafayette", priority: 0.8 },
    { path: "/frozen-shoulder-lafayette", priority: 0.8 },
    { path: "/hip-bursitis-lafayette", priority: 0.8 },
    { path: "/tennis-elbow-lafayette", priority: 0.8 },
    { path: "/achilles-tendinopathy-lafayette", priority: 0.8 },
    { path: "/si-joint-pain-lafayette", priority: 0.8 },
  ] as const;

  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}

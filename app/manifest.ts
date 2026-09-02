import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Relief +",
    short_name: "Relief +",
    description:
      "Relief Plus chiropractic, physical therapy, regenerative medicine, and patient information.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ef",
    theme_color: "#12233f",
    icons: [
      {
        src: "/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

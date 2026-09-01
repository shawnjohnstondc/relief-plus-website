import type { Metadata } from "next";

export const siteConfig = {
  name: "Relief Plus",
  url: "https://www.myreliefplus.com",
  telephone: "+1-337-565-4200",
  defaultTitle:
    "Relief Plus | Chiropractic, Physical Therapy & Regenerative Medicine",
  description:
    "Relief Plus provides chiropractic, physical therapy, and regenerative medicine for patients in Lafayette, Carencro, and Acadiana.",
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const medicalBusinessJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${siteConfig.url}/#medical-business`,
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.telephone,
  description: siteConfig.description,
  areaServed: [
    {
      "@type": "City",
      name: "Lafayette, Louisiana",
    },
    {
      "@type": "City",
      name: "Carencro, Louisiana",
    },
    {
      "@type": "AdministrativeArea",
      name: "Acadiana",
    },
  ],
};

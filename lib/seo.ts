import type { Metadata } from "next";

export const siteConfig = {
  name: "Relief Plus",
  url: "https://www.myreliefplus.com",
  telephone: "+1-337-565-4200",
  email: "myreliefplus@gmail.com",
  faxNumber: "+1-337-565-4201",
  address: {
    streetAddress: "112 Arabian Dr.",
    addressLocality: "Lafayette",
    addressRegion: "LA",
    postalCode: "70507",
    addressCountry: "US",
  },
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
  email: siteConfig.email,
  faxNumber: siteConfig.faxNumber,
  address: { "@type": "PostalAddress", ...siteConfig.address },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday"], opens: "07:00", closes: "11:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday"], opens: "12:15", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Thursday"], opens: "08:30", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Thursday"], opens: "13:15", closes: "16:00" },
  ],
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

export function createBreadcrumbStructuredData(path: `/${string}`, name: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}

export function createFaqStructuredData(items: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function createTeamStructuredData(): Record<string, unknown> {
  const people = [
    { name: "Shawn D. Johnston", honorificSuffix: "D.C.", jobTitle: "Doctor of Chiropractic" },
    { name: "Jeanne Saucier", honorificSuffix: "PT", jobTitle: "Physical Therapist" },
    { name: "Ashton Reed", honorificSuffix: "M.D.", jobTitle: "Medical Doctor" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": people.map((person) => ({
      "@type": "Person",
      ...person,
      worksFor: { "@id": `${siteConfig.url}/#medical-business` },
    })),
  };
}

type ServiceStructuredDataInput = {
  name: string;
  description: string;
  path: `/${string}`;
};

export function createServiceStructuredData({
  name,
  description,
  path,
}: ServiceStructuredDataInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name,
        description,
        url: pageUrl,
        provider: {
          "@id": `${siteConfig.url}/#medical-business`,
        },
        areaServed: [
          "Lafayette, Louisiana",
          "Carencro, Louisiana",
          "Acadiana",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

type ConditionStructuredDataInput = ServiceStructuredDataInput & {
  conditionName: string;
};

export function createConditionStructuredData({
  name,
  conditionName,
  description,
  path,
}: ConditionStructuredDataInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        name,
        description,
        url: pageUrl,
        about: { "@type": "MedicalCondition", name: conditionName },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Conditions We Treat", item: absoluteUrl("/conditions-we-treat") },
          { "@type": "ListItem", position: 3, name, item: pageUrl },
        ],
      },
    ],
  };
}

export function createConditionsCollectionStructuredData(): Record<string, unknown> {
  const path = "/conditions-we-treat";
  const pageUrl = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        name: "Conditions We Treat",
        url: pageUrl,
        description: "Musculoskeletal conditions evaluated at Relief Plus in Lafayette, Louisiana.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Conditions We Treat", item: pageUrl },
        ],
      },
    ],
  };
}

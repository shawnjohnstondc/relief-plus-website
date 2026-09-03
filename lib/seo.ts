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

type ArticleMetadataInput = PageMetadataInput & {
  datePublished: string;
  dateModified?: string;
};

export function createArticleMetadata({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: ArticleMetadataInput): Metadata {
  return {
    ...createPageMetadata({ title, description, path }),
    openGraph: {
      type: "article",
      locale: "en_US",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title,
      description,
      publishedTime: datePublished,
      ...(dateModified ? { modifiedTime: dateModified } : {}),
      authors: ["Relief Plus Editorial"],
    },
  };
}

type BlogPostingStructuredDataInput = ArticleMetadataInput & {
  headline: string;
  author?: { name: string; href: `/${string}` };
  reviewedBy?: { name: string; href: `/${string}` };
  lastReviewed?: string;
};

export function createBlogPostingStructuredData({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  author,
  reviewedBy,
  lastReviewed,
}: BlogPostingStructuredDataInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline,
        description,
        url: pageUrl,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        datePublished,
        ...(dateModified ? { dateModified } : {}),
        author: author
          ? { "@type": "Person", name: author.name, url: absoluteUrl(author.href), "@id": `${absoluteUrl(author.href)}#person` }
          : { "@type": "Organization", name: "Relief Plus Editorial", url: absoluteUrl("/clinical-standards-editorial-review") },
        ...(reviewedBy ? { reviewedBy: { "@type": "Person", name: reviewedBy.name, url: absoluteUrl(reviewedBy.href), "@id": `${absoluteUrl(reviewedBy.href)}#person` } } : {}),
        ...(lastReviewed ? { lastReviewed } : {}),
        publisher: { "@id": `${siteConfig.url}/#medical-business` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: headline,
        isPartOf: { "@id": `${absoluteUrl("/blog")}#webpage` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Patient Education", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: headline, item: pageUrl },
        ],
      },
    ],
  };
}

export function createBlogCollectionStructuredData(): Record<string, unknown> {
  const pageUrl = absoluteUrl("/blog");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        name: "Relief Plus Patient Education",
        description: "Evidence-informed articles about movement, musculoskeletal conditions, and treatment decisions.",
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Patient Education", item: pageUrl },
        ],
      },
    ],
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
  founder: { "@id": `${absoluteUrl("/dr-shawn-johnston-dc")}#person` },
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

export const websiteJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: { "@id": `${siteConfig.url}/#medical-business` },
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
    { "@id": `${absoluteUrl("/dr-shawn-johnston-dc")}#person`, name: "Shawn D. Johnston", honorificSuffix: "D.C.", jobTitle: "Doctor of Chiropractic and Founder", url: absoluteUrl("/dr-shawn-johnston-dc"), relationship: "worksFor" },
    { "@id": `${absoluteUrl("/jeanne-saucier-pt")}#person`, name: "Jeanne L. Saucier", honorificSuffix: "PT", jobTitle: "Physical Therapist", url: absoluteUrl("/jeanne-saucier-pt"), relationship: "worksFor" },
    { "@id": `${absoluteUrl("/dr-ashton-reed-md")}#person`, name: "Ashton Reed", honorificSuffix: "MD", jobTitle: "Internal Medicine Physician", url: absoluteUrl("/dr-ashton-reed-md"), relationship: "affiliation" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": people.map(({ relationship, ...person }) => ({
      "@type": "Person",
      ...person,
      [relationship]: { "@id": `${siteConfig.url}/#medical-business` },
    })),
  };
}

type ProviderProfileStructuredDataInput = {
  path: "/dr-shawn-johnston-dc" | "/dr-ashton-reed-md" | "/jeanne-saucier-pt";
  name: string;
  honorificSuffix: string;
  jobTitle: string;
  description: string;
  image: `/${string}`;
  relationship: "worksFor" | "affiliation";
  alumniOf?: string[];
  memberOf?: string[];
};

export function createProviderProfileStructuredData({
  path,
  name,
  honorificSuffix,
  jobTitle,
  description,
  image,
  relationship,
  alumniOf = [],
  memberOf = [],
}: ProviderProfileStructuredDataInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(path);
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name,
    honorificSuffix,
    jobTitle,
    description,
    url: pageUrl,
    image: absoluteUrl(image),
    [relationship]: { "@id": `${siteConfig.url}/#medical-business` },
  };

  if (alumniOf.length) {
    person.alumniOf = alumniOf.map((organization) => ({
      "@type": "EducationalOrganization",
      name: organization,
    }));
  }

  if (memberOf.length) {
    person.memberOf = memberOf.map((organization) => ({
      "@type": "Organization",
      name: organization,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile-page`,
        url: pageUrl,
        name: `${name}, ${honorificSuffix}`,
        description,
        mainEntity: { "@id": `${pageUrl}#person` },
      },
      person,
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "About Relief Plus", item: absoluteUrl("/about") },
          { "@type": "ListItem", position: 3, name: `${name}, ${honorificSuffix}`, item: pageUrl },
        ],
      },
    ],
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

import type { Metadata, Viewport } from "next";
import JsonLd from "@/app/components/JsonLd";
import { medicalBusinessJsonLd, siteConfig } from "@/lib/seo";
import ScrollReveal from "@/app/components/ScrollReveal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | Relief Plus",
  },
  description: siteConfig.description,
  authors: [{ name: "Relief Plus" }],
  creator: "Relief Plus",
  publisher: "Relief Plus",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f5ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={medicalBusinessJsonLd} />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myreliefplus.com"),
  title: {
    default:
      "Relief Plus | Chiropractic, Physical Therapy & Regenerative Medicine",
    template: "%s | Relief Plus",
  },
  description:
    "Relief Plus provides chiropractic, physical therapy, and regenerative medicine for patients in Lafayette, Carencro, and Acadiana.",
  authors: [{ name: "Relief Plus" }],
  creator: "Relief Plus",
  publisher: "Relief Plus",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.myreliefplus.com",
    siteName: "Relief Plus",
    title:
      "Relief Plus | Chiropractic, Physical Therapy & Regenerative Medicine",
    description:
      "Chiropractic, physical therapy, and regenerative medicine for Lafayette, Carencro, and the Acadiana community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

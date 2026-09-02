import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Time Card",
  description: "Private Relief Plus staff utility.",
  robots: { index: false, follow: false, nocache: true },
};

export default function TimeCardLayout({ children }: { children: React.ReactNode }) {
  return <div className="time-card-app">{children}</div>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Patient Education | Relief Plus",
    template: "%s",
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

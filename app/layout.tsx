import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { color } from "@/lib/design-system/tokens";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import { barlowCondensed, kalam, newsreader, roadRupeeFamily } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · The Ride",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "The Ride",
    title: siteTitle,
    description: siteDescription,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: color("paper"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${barlowCondensed.variable} ${kalam.variable}`}
      style={{ "--font-road-rupee": roadRupeeFamily } as CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { color } from "@/lib/design-system/tokens";
import { barlowCondensed, kalam, newsreader, roadRupeeFamily } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sahil Ladhania · The Ride",
    template: "%s · The Ride",
  },
  description:
    "A ride through ten years, 2016 to 2026, on a black bike. Sahil Ladhania’s entry for the Wispr Flow India growth challenge.",
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

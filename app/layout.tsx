import type { Metadata } from "next";
import { Space_Grotesk, Spline_Sans } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
});

const spline = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-spline",
});

export const metadata: Metadata = {
  title: "PulseFunnel | Omnichannel Growth HQ",
  description:
    "Interactive Next.js control room for omnichannel marketing: SEO, ads, content, lifecycle, and community orchestration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${space.variable} ${spline.variable} bg-night`}>{children}</body>
    </html>
  );
}

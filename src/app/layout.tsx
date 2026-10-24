import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["normal", "italic"] });

const siteUrl = "https://seafinder360.com";
const title = "SeaFinder360 | Yacht Charter, Sales & Management Dubai";
const description = "SeaFinder360 is your all-in-one platform for luxury yacht charter, sales, brokerage, and marina services in Dubai. Book a 360° virtual tour today.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["yacht charter dubai", "yacht sales", "yacht broker", "marina services", "luxury yacht rental", "SeaFinder360"],
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: siteUrl, title, description, images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/og-image.jpg"] },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "LocalBusiness", name: "SeaFinder360",
          image: `${siteUrl}/assets/logo.jpg`, description,
          address: { "@type": "PostalAddress", streetAddress: "Dubai Marina Walk", addressLocality: "Dubai", addressCountry: "AE" },
          telephone: "+971503233803", url: siteUrl,
        }) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Energy Bill Relief",
  description:
    "AidHub is dedicated to providing resources, support, and relief to communities in need. Join us in making a positive impact worldwide.",
  keywords: [
    "Humanitarian Aid",
    "Community Support",
    "Relief Efforts",
    "Non-Profit",
    "Donations",
    "Charity",
    "Global Assistance",
  ],
  authors: [{ name: "AidHub Organization", url: "https://aidhub.org" }],
  themeColor: "#00796b", // A soothing color representing help and hope
  openGraph: {
    title: "AidHub | Supporting Communities in Need",
    description:
      "Join AidHub to provide relief and resources to those in need. Together, we can make a difference.",
    url: "https://aidhub.org",
    siteName: "AidHub",
    images: [
      {
        url: "https://aidhub.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AidHub - Supporting Communities in Need",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AidHub | Supporting Communities in Need",
    description:
      "AidHub provides resources, support, and relief to communities in need. Join us today!",
    images: ["https://aidhub.org/twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1.0",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

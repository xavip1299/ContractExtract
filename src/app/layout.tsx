import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.contractextract.org"),
  title: {
    default: "ContractExtract – AI Contract Data Extraction",
    template: "%s | ContractExtract",
  },
  description:
    "Upload any contract PDF or TXT and instantly extract key data: parties, dates, payment terms, obligations, governing law, and more. Powered by GPT-4o. Save hours of manual contract review.",
  keywords: [
    "contract extraction",
    "AI contract analysis",
    "contract data extraction",
    "PDF contract parser",
    "legal AI tool",
    "contract review software",
    "extract contract terms",
    "contract automation",
  ],
  authors: [{ name: "ContractExtract" }],
  creator: "ContractExtract",
  publisher: "ContractExtract",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "ContractExtract – AI Contract Data Extraction",
    description:
      "Extract parties, dates, payment terms and more from any contract in seconds. Powered by GPT-4o.",
    url: "https://www.contractextract.org",
    siteName: "ContractExtract",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ContractExtract – AI Contract Data Extraction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContractExtract – AI Contract Data Extraction",
    description:
      "Extract parties, dates, payment terms and more from any contract in seconds. Powered by GPT-4o.",
    images: ["/og-image.png"],
    creator: "@contractextract",
  },
  alternates: {
    canonical: "https://www.contractextract.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

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
  title: "ContractExtract – AI Contract Data Extraction",
  description:
    "Upload any contract PDF or TXT and instantly extract key data: parties, dates, payment terms, obligations, and more. Powered by GPT-4o.",
  metadataBase: new URL("https://contractextract.org"),
  openGraph: {
    title: "ContractExtract – AI Contract Data Extraction",
    description: "Extract parties, dates, payment terms and more from any contract in seconds.",
    url: "https://contractextract.org",
    siteName: "ContractExtract",
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

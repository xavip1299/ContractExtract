import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog – Contract Extraction Tips & Legal AI Guides",
  description:
    "Guides, tips, and best practices for contract data extraction, legal AI tools, and contract review automation.",
  alternates: {
    canonical: "https://www.contractextract.org/blog",
  },
  openGraph: {
    title: "Blog – Contract Extraction Tips & Legal AI Guides",
    description:
      "Guides, tips, and best practices for contract data extraction, legal AI tools, and contract review automation.",
    url: "https://www.contractextract.org/blog",
  },
};

const posts = [
  {
    slug: "how-to-extract-data-from-contracts",
    title: "How to Extract Key Data from Contracts (Manual vs. AI)",
    excerpt:
      "Manually reviewing contracts takes hours. Learn how AI tools can automatically extract parties, dates, payment terms, and key clauses in seconds.",
    date: "June 1, 2026",
    readTime: "5 min read",
    category: "Guide",
  },
  {
    slug: "contract-review-checklist",
    title: "The Ultimate Contract Review Checklist for 2026",
    excerpt:
      "Before signing any contract, make sure you've checked these 12 critical elements. A practical checklist for startups, freelancers, and legal teams.",
    date: "June 1, 2026",
    readTime: "7 min read",
    category: "Checklist",
  },
  {
    slug: "ai-contract-analysis-guide",
    title: "AI Contract Analysis: How It Works and Why It Matters",
    excerpt:
      "AI is transforming how legal teams handle contracts. Understand how large language models extract meaning from legal documents and where the technology stands today.",
    date: "June 1, 2026",
    readTime: "6 min read",
    category: "Deep Dive",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="w-6 h-6 text-blue-500" />
            ContractExtract
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-white text-sm font-medium">
              Blog
            </Link>
            <Link href="/login" className="text-gray-400 hover:text-white text-sm transition">
              Sign in
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Try free
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Blog</h1>
          <p className="text-gray-400 text-lg">
            Guides and tips on contract data extraction, legal AI, and contract automation.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 border border-blue-800/50 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span className="text-gray-600 text-sm">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-blue-400 text-sm font-medium flex items-center gap-1">
                Read article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-blue-950/30 border border-blue-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Try ContractExtract free</h2>
          <p className="text-gray-400 mb-6">
            Upload a contract and get structured data in seconds. No credit card required.
          </p>
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition inline-flex items-center gap-2"
          >
            Start free — 5 extractions/month <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            ContractExtract.org
          </div>
          <p>2026 ContractExtract. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

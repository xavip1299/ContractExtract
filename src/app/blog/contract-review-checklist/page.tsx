import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "The Ultimate Contract Review Checklist for 2026",
  description:
    "Before signing any contract, check these 12 critical elements. A practical contract review checklist for startups, freelancers, and legal teams.",
  alternates: {
    canonical: "https://www.contractextract.org/blog/contract-review-checklist",
  },
  openGraph: {
    title: "The Ultimate Contract Review Checklist for 2026",
    description:
      "Before signing any contract, check these 12 critical elements. A practical checklist for startups, freelancers, and legal teams.",
    url: "https://www.contractextract.org/blog/contract-review-checklist",
  },
};

const checklist = [
  {
    item: "Identify all parties clearly",
    detail:
      "Full legal names, not trading names. Make sure you know exactly who you are contracting with.",
    critical: true,
  },
  {
    item: "Confirm the effective date",
    detail:
      "When does the contract start? Is it retroactive? Check if obligations begin before signing.",
    critical: true,
  },
  {
    item: "Check the expiration date and auto-renewal",
    detail:
      "Many contracts auto-renew without notice. Know the end date and the cancellation window.",
    critical: true,
  },
  {
    item: "Review payment terms in full",
    detail:
      "Amount, currency, due dates, late payment penalties, and accepted payment methods.",
    critical: true,
  },
  {
    item: "Understand the scope of work",
    detail:
      "What exactly is being delivered? Vague scope leads to disputes. Every deliverable should be defined.",
    critical: true,
  },
  {
    item: "Check intellectual property ownership",
    detail:
      "Who owns work created under the contract? This is critical for freelancers and software projects.",
    critical: true,
  },
  {
    item: "Read the confidentiality / NDA clause",
    detail:
      "What information must you keep secret? For how long? After termination?",
    critical: false,
  },
  {
    item: "Review the termination clause",
    detail:
      "How can the contract be ended? What notice period is required? What are the penalties for early exit?",
    critical: true,
  },
  {
    item: "Check the governing law and jurisdiction",
    detail:
      "If a dispute arises, which country or state's laws apply? Where must disputes be resolved?",
    critical: false,
  },
  {
    item: "Look for limitation of liability clauses",
    detail:
      "Is either party's liability capped? Unlimited liability clauses can be dangerous for small businesses.",
    critical: true,
  },
  {
    item: "Check indemnification provisions",
    detail:
      "Are you required to indemnify the other party for certain losses? This is often buried in boilerplate.",
    critical: false,
  },
  {
    item: "Review dispute resolution mechanism",
    detail:
      "Is it court, arbitration, or mediation? Mandatory arbitration clauses can waive your right to sue.",
    critical: false,
  },
];

export default function Article2() {
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
            <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition">
              Blog
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

      <article className="max-w-2xl mx-auto px-4 pt-32 pb-24">
        <Link
          href="/blog"
          className="text-gray-500 hover:text-white text-sm flex items-center gap-1 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>

        <div className="mb-8">
          <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 border border-blue-800/50 px-2.5 py-1 rounded-full">
            Checklist
          </span>
          <p className="text-gray-500 text-sm mt-3">June 1, 2026 · 7 min read</p>
        </div>

        <h1 className="text-4xl font-extrabold mb-6 leading-tight">
          The Ultimate Contract Review Checklist for 2026
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Signing a contract without proper review is one of the most common — and costly —
            mistakes made by startups, freelancers, and small businesses. You do not need a lawyer
            for every contract, but you do need a consistent review process.
          </p>
          <p>
            Here are the 12 elements you must check before signing any contract.
          </p>

          <div className="flex gap-6 text-sm mt-4">
            <span className="flex items-center gap-2 text-red-400">
              <span className="w-4 h-4 rounded-full bg-red-900/50 border border-red-700 flex items-center justify-center">
                <X className="w-2.5 h-2.5" />
              </span>
              Critical — never skip
            </span>
            <span className="flex items-center gap-2 text-green-400">
              <span className="w-4 h-4 rounded-full bg-green-900/50 border border-green-700 flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </span>
              Important
            </span>
          </div>

          <div className="space-y-3 mt-6">
            {checklist.map((item, i) => (
              <div
                key={i}
                className={`rounded-xl border p-5 ${
                  item.critical
                    ? "border-red-900/50 bg-red-950/10"
                    : "border-gray-800 bg-gray-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      item.critical
                        ? "bg-red-900/50 border-red-700"
                        : "bg-green-900/50 border-green-700"
                    }`}
                  >
                    {item.critical ? (
                      <X className="w-3 h-3 text-red-400" />
                    ) : (
                      <Check className="w-3 h-3 text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {i + 1}. {item.item}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Speed up your review with AI
          </h2>
          <p>
            Instead of searching through every page for these 12 elements, you can use
            ContractExtract to automatically identify parties, dates, payment terms, termination
            clauses, governing law, and more — in seconds.
          </p>
          <p>
            Use the AI extraction as your first pass, then verify the critical items manually. You
            will cut review time by 80% without missing anything important.
          </p>
        </div>

        <div className="mt-12 bg-blue-950/30 border border-blue-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Extract your contract data in seconds</h2>
          <p className="text-gray-400 text-sm mb-5">
            Upload any PDF or TXT contract. Get all 12 checklist items extracted automatically.
          </p>
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition inline-flex items-center gap-2"
          >
            Try free — no credit card <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link href="/blog" className="text-gray-500 hover:text-white text-sm flex items-center gap-1 transition">
            <ArrowLeft className="w-4 h-4" /> More articles
          </Link>
        </div>
      </article>

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

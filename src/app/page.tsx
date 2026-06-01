import Link from "next/link";
import {
  FileText,
  Zap,
  Shield,
  Clock,
  Check,
  ArrowRight,
  Building2,
  Scale,
  Briefcase,
} from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ContractExtract",
  url: "https://www.contractextract.org",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered contract data extraction. Upload any PDF or TXT contract and instantly extract parties, dates, payment terms, obligations, governing law, and more.",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "5 extractions per month",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "29",
      priceCurrency: "USD",
      description: "100 extractions per month",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      price: "99",
      priceCurrency: "USD",
      description: "1000 extractions per month",
    },
  ],
  featureList: [
    "AI contract data extraction",
    "PDF and TXT support",
    "Parties identification",
    "Payment terms extraction",
    "Governing law detection",
    "Termination clause analysis",
    "JSON export",
  ],
};

export default function LandingPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="w-6 h-6 text-blue-500" />
            ContractExtract
          </Link>
          <div className="flex items-center gap-4">
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

      {/* Hero */}
      <section className="pt-36 pb-24 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          Powered by GPT-4o · No credit card required
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Extract key data from{" "}
          <span className="text-blue-500">any contract</span>{" "}
          in seconds
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Upload a PDF or TXT contract and instantly get structured data — parties,
          dates, payment terms, obligations, and more. No more manual reviewing.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition flex items-center gap-2"
          >
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 font-medium px-7 py-3.5 rounded-xl text-base transition"
          >
            Sign in
          </Link>
        </div>
        <p className="mt-4 text-gray-500 text-sm">5 extractions free every month</p>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Everything you need</h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Stop spending hours reading contracts. Our AI reads them for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Instant Extraction",
                desc: "Upload and get structured results in under 30 seconds. Powered by GPT-4o.",
                color: "text-yellow-400",
                bg: "bg-yellow-900/20",
              },
              {
                icon: Shield,
                title: "Key Clauses Identified",
                desc: "Parties, dates, payment terms, governing law, NDA clauses, termination — all flagged.",
                color: "text-blue-400",
                bg: "bg-blue-900/20",
              },
              {
                icon: Clock,
                title: "Save Hours Per Week",
                desc: "Legal and procurement teams save 3-5 hours per week on contract review.",
                color: "text-green-400",
                bg: "bg-green-900/20",
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">Who uses ContractExtract</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: "Law Firms", desc: "Quickly extract clause summaries across large contract volumes." },
              { icon: Building2, title: "Procurement Teams", desc: "Compare vendor contracts side-by-side with structured data." },
              { icon: Briefcase, title: "Startups and SMBs", desc: "No in-house legal? Understand what you are signing before you sign it." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Simple pricing</h2>
          <p className="text-gray-400 text-center mb-14">Start free. Upgrade when you need more.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "For individuals getting started",
                features: ["5 extractions / month", "PDF and TXT files", "JSON export"],
                cta: "Get started",
                href: "/register",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$29/mo",
                desc: "For professionals and small teams",
                features: [
                  "100 extractions / month",
                  "PDF and TXT files",
                  "JSON export",
                  "Priority support",
                  "API access (soon)",
                ],
                cta: "Start free trial",
                href: "/register",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "$99/mo",
                desc: "For legal teams and high volume",
                features: [
                  "1,000 extractions / month",
                  "PDF and TXT files",
                  "JSON export",
                  "Dedicated support",
                  "API access (soon)",
                  "Custom fields (soon)",
                ],
                cta: "Get started",
                href: "/register",
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  tier.highlight
                    ? "border-blue-500 bg-blue-950/20"
                    : "border-gray-800 bg-gray-900"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
                <p className="text-3xl font-extrabold text-white mb-1">{tier.price}</p>
                <p className="text-gray-400 text-sm mb-5">{tier.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition ${
                    tier.highlight
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 border-t border-gray-800 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Ready to save hours on contracts?</h2>
        <p className="text-gray-400 mb-8 text-lg">Join hundreds of legal and procurement professionals.</p>
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-base transition inline-flex items-center gap-2"
        >
          Start for free — no credit card <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
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

"use client";

import { useState } from "react";
import { Check, Loader2, Zap } from "lucide-react";

interface Props {
  plan: string;
  stripeCustomerId: string | null;
}

const tiers = [
  {
    key: "FREE",
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Get started with contract extraction",
    features: [
      "5 extractions / month",
      "PDF & TXT support",
      "JSON export",
      "Email support",
    ],
    cta: "Current plan",
    highlight: false,
  },
  {
    key: "PRO",
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For professionals and small teams",
    features: [
      "100 extractions / month",
      "PDF & TXT support",
      "JSON export",
      "Priority support",
      "API access (coming soon)",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    key: "ENTERPRISE",
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "High volume for legal teams",
    features: [
      "1,000 extractions / month",
      "PDF & TXT support",
      "JSON export",
      "Dedicated support",
      "API access (coming soon)",
      "Custom fields (coming soon)",
    ],
    cta: "Upgrade to Enterprise",
    highlight: false,
  },
];

export default function BillingClient({ plan, stripeCustomerId }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleUpgrade(tierKey: string) {
    setLoading(tierKey);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: tierKey }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(null);
  }

  async function openPortal() {
    setLoading("portal");
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Billing</h1>
      <p className="text-gray-400 mb-8">
        Current plan: <span className="text-white font-medium capitalize">{plan.toLowerCase()}</span>
        {stripeCustomerId && (
          <button
            onClick={openPortal}
            disabled={!!loading}
            className="ml-4 text-blue-400 hover:text-blue-300 text-sm underline disabled:opacity-50"
          >
            {loading === "portal" ? "Opening…" : "Manage subscription"}
          </button>
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const isCurrent = plan === tier.key;
          return (
            <div
              key={tier.key}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                tier.highlight
                  ? "border-blue-500 bg-blue-950/30"
                  : "border-gray-800 bg-gray-900"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-lg">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400">{tier.period}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{tier.description}</p>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => !isCurrent && tier.key !== "FREE" && handleUpgrade(tier.key)}
                disabled={isCurrent || tier.key === "FREE" || !!loading}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  isCurrent
                    ? "bg-gray-700 text-gray-400 cursor-default"
                    : tier.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
                    : "bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
                }`}
              >
                {loading === tier.key ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isCurrent ? (
                  <>
                    <Zap className="w-4 h-4" /> Current Plan
                  </>
                ) : (
                  tier.cta
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

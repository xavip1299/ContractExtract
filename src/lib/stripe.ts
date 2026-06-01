import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia" as "2026-05-27.dahlia",
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    slug: "free",
    quota: 5, // extractions per month
    price: { amount: 0, priceIds: { monthly: "" } },
  },
  PRO: {
    name: "Pro",
    slug: "pro",
    quota: 100,
    price: {
      amount: 29,
      priceIds: { monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? "" },
    },
  },
  ENTERPRISE: {
    name: "Enterprise",
    slug: "enterprise",
    quota: 1000,
    price: {
      amount: 99,
      priceIds: {
        monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID ?? "",
      },
    },
  },
} as const;

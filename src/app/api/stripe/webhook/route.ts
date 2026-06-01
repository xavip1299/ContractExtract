import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const userId = session.metadata?.userId;
    const plan = (session.metadata?.plan ?? "PRO") as "PRO" | "ENTERPRISE";

    if (!userId) return NextResponse.json({ error: "No user" }, { status: 400 });

    const subAny = subscription as unknown as { current_period_end: number; items: { data: { price: { id: string } }[] } };
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCurrentPeriodEnd: new Date(subAny.current_period_end * 1000),
        stripePriceId: subAny.items.data[0].price.id,
        plan,
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    const invoiceAny = invoice as unknown as { subscription: string };
    const subscriptionId = invoiceAny.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subAny = subscription as unknown as { current_period_end: number };

    await prisma.user.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        stripeCurrentPeriodEnd: new Date(subAny.current_period_end * 1000),
      },
    });
  }

  if (
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.updated"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    if (subscription.status === "canceled" || subscription.status === "unpaid") {
      await prisma.user.update({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: "FREE", stripeSubscriptionId: null, stripePriceId: null },
      });
    }
  }

  return NextResponse.json({ received: true });
}

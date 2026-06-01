import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: { plan: true, stripeCustomerId: true },
  });

  return (
    <BillingClient
      plan={user?.plan ?? "FREE"}
      stripeCustomerId={user?.stripeCustomerId ?? null}
    />
  );
}

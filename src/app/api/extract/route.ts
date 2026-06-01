import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractContractData } from "@/lib/openai";
import { extractText, getDocumentProxy } from "unpdf";

const PLAN_QUOTAS = { FREE: 5, PRO: 100, ENTERPRISE: 1000 } as const;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          extractions: {
            where: {
              createdAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              },
              status: "DONE",
            },
          },
        },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const quota = PLAN_QUOTAS[user.plan as keyof typeof PLAN_QUOTAS] ?? 5;
  if (user._count.extractions >= quota) {
    return NextResponse.json(
      { error: "Monthly extraction limit reached. Please upgrade your plan." },
      { status: 429 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["application/pdf", "text/plain"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only PDF and TXT files are supported" },
      { status: 400 }
    );
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  const extraction = await prisma.extraction.create({
    data: {
      userId: session.user.id,
      fileName: file.name,
      fileSize: file.size,
      status: "PROCESSING",
    },
  });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    let text: string;

    if (file.type === "application/pdf") {
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { text: pdfText } = await extractText(pdf, { mergePages: true });
      text = pdfText;
    } else {
      text = buffer.toString("utf-8");
    }

    if (!text || text.trim().length < 50) {
      throw new Error("Could not extract readable text from file");
    }

    const data = await extractContractData(text);

    const updated = await prisma.extraction.update({
      where: { id: extraction.id },
      data: {
        status: "DONE",
        parties: data.parties ?? undefined,
        effectiveDate: data.effectiveDate ?? undefined,
        expirationDate: data.expirationDate ?? undefined,
        paymentTerms: data.paymentTerms ?? undefined,
        governingLaw: data.governingLaw ?? undefined,
        confidentiality: data.confidentiality ?? undefined,
        terminationClause: data.terminationClause ?? undefined,
        keyObligations: data.keyObligations ?? undefined,
        rawJson: JSON.stringify(data),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    await prisma.extraction.update({
      where: { id: extraction.id },
      data: { status: "FAILED" },
    });
    console.error("[extract]", err);
    return NextResponse.json(
      { error: "Extraction failed. Please try again." },
      { status: 500 }
    );
  }
}

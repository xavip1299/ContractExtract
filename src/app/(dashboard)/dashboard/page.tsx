import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/stripe";
import Link from "next/link";
import { FileText, Upload, Zap, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    include: {
      extractions: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
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

  if (!user) return null;

  const plan = user.plan as keyof typeof PLANS;
  const quota = PLANS[plan].quota;
  const used = user._count.extractions;
  const pct = Math.min((used / quota) * 100, 100);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back, {user.name?.split(" ")[0] ?? "there"}!</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm">Plan</span>
          </div>
          <p className="text-2xl font-bold text-white capitalize">{plan.toLowerCase()}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm">This month</span>
          </div>
          <p className="text-2xl font-bold text-white">{used} <span className="text-sm font-normal text-gray-400">/ {quota}</span></p>
          <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-gray-400 text-sm">Total extracted</span>
          </div>
          <p className="text-2xl font-bold text-white">{user.extractions.length > 5 ? "5+" : user.extractions.length}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 border border-blue-700/50 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-lg">Extract a contract</h2>
          <p className="text-gray-400 text-sm mt-0.5">Upload a PDF or TXT and get structured data in seconds</p>
        </div>
        <Link
          href="/extract"
          className="shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          <Upload className="w-4 h-4" />
          Upload
        </Link>
      </div>

      {/* Recent */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white font-semibold">Recent Extractions</h2>
          <Link href="/history" className="text-blue-400 hover:text-blue-300 text-sm">View all</Link>
        </div>
        {user.extractions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FileText className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No extractions yet. Upload your first contract!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {user.extractions.map((e: typeof user.extractions[number]) => (
              <div key={e.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-white text-sm truncate">{e.fileName}</span>
                </div>
                <div className="flex items-center gap-4 ml-4 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    e.status === "DONE" ? "bg-green-900/40 text-green-400" :
                    e.status === "FAILED" ? "bg-red-900/40 text-red-400" :
                    "bg-yellow-900/40 text-yellow-400"
                  }`}>{e.status}</span>
                  <span className="text-gray-500 text-xs">{formatDate(e.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

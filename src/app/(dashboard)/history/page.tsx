import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FileText } from "lucide-react";
import { formatDate, formatBytes } from "@/lib/utils";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  const extractions = await prisma.extraction.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Extraction History</h1>
      <p className="text-gray-400 mb-8">All your past contract extractions.</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {extractions.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileText className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No extractions yet.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-6 py-3">File</th>
                <th className="px-6 py-3">Size</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Parties</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {extractions.map((e: typeof extractions[number]) => (
                <tr key={e.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="text-white text-sm truncate max-w-[200px]">{e.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{formatBytes(e.fileSize)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      e.status === "DONE" ? "bg-green-900/40 text-green-400" :
                      e.status === "FAILED" ? "bg-red-900/40 text-red-400" :
                      "bg-yellow-900/40 text-yellow-400"
                    }`}>{e.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm truncate max-w-[200px]">
                    {e.parties ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

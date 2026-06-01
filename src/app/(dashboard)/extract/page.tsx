"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";

type Status = "idle" | "uploading" | "done" | "error";

interface Result {
  id: string;
  fileName: string;
  parties: string | null;
  effectiveDate: string | null;
  expirationDate: string | null;
  paymentTerms: string | null;
  governingLaw: string | null;
  confidentiality: string | null;
  terminationClause: string | null;
  keyObligations: string | null;
}

export default function ExtractPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
    setResult(null);
    setError("");
    setStatus("idle");
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  async function extract() {
    if (!file) return;
    setStatus("uploading");
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/extract", { method: "POST", body: fd });
    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setError(data.error ?? "Extraction failed");
      return;
    }

    setResult(data);
    setStatus("done");
  }

  const fields = result
    ? ([
        ["Parties", result.parties],
        ["Effective Date", result.effectiveDate],
        ["Expiration Date", result.expirationDate],
        ["Payment Terms", result.paymentTerms],
        ["Governing Law", result.governingLaw],
        ["Confidentiality", result.confidentiality],
        ["Termination Clause", result.terminationClause],
        ["Key Obligations", result.keyObligations],
      ] as [string, string | null][]).filter(([, v]) => v)
    : [];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-1">Extract Contract Data</h1>
      <p className="text-gray-400 mb-8">Upload a PDF or TXT contract and AI will pull out the key fields instantly.</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer mb-6",
          dragging ? "border-blue-500 bg-blue-900/10" : "border-gray-700 hover:border-gray-500"
        )}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <p className="text-white font-medium text-sm">{file.name}</p>
              <p className="text-gray-400 text-xs">{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null); setStatus("idle"); setResult(null); }}
              className="ml-2 text-gray-500 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-white font-medium">Drop your contract here</p>
            <p className="text-gray-400 text-sm mt-1">PDF or TXT, up to 10MB</p>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={extract}
        disabled={!file || status === "uploading"}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {status === "uploading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Extracting…
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            Extract Data
          </>
        )}
      </button>

      {/* Results */}
      {status === "done" && result && (
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <h2 className="text-white font-semibold">Extracted Data</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {fields.map(([label, value]) => (
              <div key={label} className="px-6 py-4">
                <dt className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</dt>
                <dd className="text-white text-sm leading-relaxed">{value}</dd>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-800">
            <button
              onClick={() => {
                const json = JSON.stringify(
                  Object.fromEntries(fields.map(([k, v]) => [k, v])),
                  null,
                  2
                );
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${result.fileName.replace(/\.[^.]+$/, "")}-extracted.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Download JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

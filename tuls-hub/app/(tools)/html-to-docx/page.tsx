"use client";

import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { FileText, Loader2 } from "lucide-react";
import { API_BASE } from "@/app/lib/api";

function getFileNameFromContentDisposition(header?: string | null) {
  if (!header) return null;
  const match = /filename\*?=([^;]+)/i.exec(header);
  if (!match) return null;
  let filename = match[1].trim();
  filename = filename.replace(/"/g, "");
  if (filename.toLowerCase().startsWith("utf-8''")) {
    filename = decodeURIComponent(filename.replace(/^utf-8''/i, ""));
  }
  return filename;
}

function downloadBlob(blob: Blob, filename: string) {
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
}

async function fetchHtmlToDocx(urls: string[]) {
  const payload = urls.length === 1 ? { url: urls[0] } : { urls };
  const response = await fetch(`${API_BASE}/html-to-docx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to convert. Check URL or try again.");
  }

  const blob = await response.blob();
  const filename =
    getFileNameFromContentDisposition(
      response.headers.get("content-disposition"),
    ) || (urls.length === 1 ? "document.zip" : "documents.zip");

  return { blob, filename };
}

function HtmlToDocxForm() {
  const [urlsText, setUrlsText] = useState("");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const mutation = useMutation<
    { blob: Blob; filename: string },
    Error,
    string[]
  >({
    mutationFn: fetchHtmlToDocx,
    onSuccess: (data) => {
      const { blob, filename } = data;
      setError("");
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadName(filename);
      downloadBlob(blob, filename);
    },
    onError: (error: Error) => {
      setError(error.message || "Failed to convert. Check URL or try again.");
      setDownloadUrl("");
      setDownloadName("");
    },
  });

  const handleConvert = () => {
    const lines = urlsText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setError("Please enter one or more valid URLs.");
      return;
    }

    setError("");
    setDownloadUrl("");
    setDownloadName("");
    mutation.mutate(lines);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-[#2f27ce]" />
        <h1 className="text-2xl font-semibold">HTML to DOCX</h1>
      </div>

      <textarea
        rows={6}
        placeholder="Enter one or more webpage URLs, one per line..."
        value={urlsText}
        onChange={(e) => setUrlsText(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 resize-none"
      />

      <button
        onClick={handleConvert}
        disabled={mutation.status === "pending"}
        className="bg-[#2f27ce] disabled:opacity-60 text-white px-6 py-3 rounded-lg flex items-center gap-2"
      >
        {mutation.status === "pending" && (
          <Loader2 className="animate-spin" size={18} />
        )}
        Convert
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {downloadUrl && downloadName && (
        <a
          href={downloadUrl}
          download={downloadName}
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Download ZIP
        </a>
      )}
    </div>
  );
}

export default function HtmlToDocxPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HtmlToDocxForm />
    </QueryClientProvider>
  );
}

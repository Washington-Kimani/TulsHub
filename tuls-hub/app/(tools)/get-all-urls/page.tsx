"use client";

import { useState } from "react";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import { postData } from "@/app/lib/api";

export default function LinkExtractor() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    if (!url) return setError("Enter a valid URL");

    try {
      setLoading(true);
      setError("");
      setLinks([]);

      const data = await postData("/extract-links", { url });
      setLinks(data.links);
    } catch {
      setError("Failed to extract links.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csv = links.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "links.csv";
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex items-center gap-2 mb-4">
        <LinkIcon className="text-[#2f27ce]" />
        <h1 className="text-2xl font-semibold">Link Extractor</h1>
      </div>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL..."
        className="w-full p-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleExtract}
        className="bg-[#2f27ce] text-white px-6 py-3 rounded-lg flex gap-2 items-center"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Extract Links
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {links.length > 0 && (
        <>
          <button
            onClick={downloadCSV}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download CSV
          </button>

          <div className="mt-6 max-h-[400px] overflow-auto border rounded">
            <table className="w-full text-sm">
              <tbody>
                {links.map((link, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 break-all">{link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

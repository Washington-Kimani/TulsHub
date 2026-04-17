"use client";

import { useState } from "react";
import { ImageDown, Loader2 } from "lucide-react";
import { postData } from "@/app/lib/api";
import Image from "next/image";

export default function ImageDownloader() {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url) return setError("Enter a valid URL");

    try {
      setLoading(true);
      setError("");
      setImages([]);

      const data = await postData("/extract-images", { url });
      setImages(data.images);
    } catch {
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex items-center gap-2 mb-4">
        <ImageDown className="text-[#2f27ce]" />
        <h1 className="text-2xl font-semibold">Image Downloader</h1>
      </div>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL..."
        className="w-full p-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleFetch}
        className="bg-[#2f27ce] text-white px-6 py-3 rounded-lg flex gap-2 items-center"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Fetch Images
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {images.map((img, i) => (
          <div key={i} className="relative w-full h-40">
            <Image src={img} alt="img" fill className="object-cover rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

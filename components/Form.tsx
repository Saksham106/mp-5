"use client";

import { useState, useEffect } from "react";
import createUrl from "@/lib/createUrl";
import { Url } from "@/types";

export default function Form() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setShortenedUrl(null);

    try {
      const result = await createUrl(longUrl, customAlias);
      
      if (typeof result === "string") {
        setError(result);
      } else {
        const urlObj = result as Url;
        setShortenedUrl(urlObj.urlAfter);
      }
    } catch (err) {
      console.error("Error creating shortened URL:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (shortenedUrl && origin) {
      const fullUrl = `${origin}/${shortenedUrl}`;
      navigator.clipboard.writeText(fullUrl);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <div className="max-w-[680px] mx-auto my-7 px-6 font-sans">
      <form 
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 
                  rounded-lg p-6 flex flex-col gap-5
                  border border-[var(--border)]"
      >
        <h2 className="text-xl mb-4 font-semibold text-center
                      text-slate-800 dark:text-slate-100">
          Create Your Shortened URL
        </h2>

        <div className="flex flex-col">
          <label 
            htmlFor="longUrl" 
            className="text-base font-medium mb-2
                      text-slate-800 dark:text-slate-100"
          >
            Original URL
          </label>
          <input
            id="longUrl"
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/verylongpathtopage"
            required
            disabled={isSubmitting}
            className="py-2 px-3 border border-slate-300 rounded-md
                      bg-white text-slate-800 
                      focus:outline-none focus:border-blue-400"
          />
        </div>
        
        <div className="flex flex-col">
          <label 
            htmlFor="customAlias" 
            className="text-base font-medium mb-2
                      text-slate-800 dark:text-slate-100"
          >
            Custom Alias (Optional)
          </label>
          <div className="flex items-center">
            <span className="text-sm whitespace-nowrap pr-2
                        text-slate-700 dark:text-slate-300">
              {origin}/
            </span>
            <input
              id="customAlias"
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="my-custom-alias"
              disabled={isSubmitting}
              className="py-2 px-3 border border-slate-300 rounded-md w-full
                        bg-white text-slate-800
                        focus:outline-none focus:border-blue-400"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
            Leave empty for a randomly generated alias
          </p>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !longUrl}
          className="bg-blue-500 text-white py-2 px-4 font-medium
                    border-none rounded-md text-base cursor-pointer
                    mt-2 disabled:bg-blue-300
                    disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Generate Short URL"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-3
                      rounded-md text-sm mt-4 text-center border border-red-200">
          {error}
        </div>
      )}

      {shortenedUrl && (
        <div className="bg-blue-50 dark:bg-slate-700
                      mt-4 p-4 rounded-md border border-blue-200 dark:border-blue-800">
          <p className="font-medium text-blue-800 dark:text-blue-300 mb-3 text-base">
            Your shortened URL is ready!
          </p>
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 py-2 px-3
                        rounded-md border border-slate-200 dark:border-slate-600">
            <a 
              href={`${origin}/${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-300 overflow-hidden
                        text-ellipsis font-medium"
            >
              {`${origin}/${shortenedUrl}`}
            </a>
            <button 
              onClick={handleCopyToClipboard}
              type="button"
              className="bg-blue-500 text-white border-none rounded-md py-1 px-3
                        text-sm cursor-pointer"
            >
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
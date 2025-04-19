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
        className="bg-white/80 dark:bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/80 
                  rounded-2xl shadow-lg p-8 flex flex-col gap-5 backdrop-blur-md
                  border border-[var(--border)] transition-all duration-200 
                  hover:-translate-y-0.5 hover:shadow-xl"
      >
        <h2 className="text-[1.85rem] mb-7 font-bold text-center
                      text-slate-100 dark:text-slate-100 shadow-sm
                      dark:text-shadow bg-gradient-to-r from-slate-800 to-slate-600
                      bg-clip-text text-transparent dark:text-slate-100">
          Create Your Shortened URL
        </h2>

        <div className="flex flex-col">
          <label 
            htmlFor="longUrl" 
            className="text-base font-semibold mb-2 text-slate-100 dark:text-slate-100
                      tracking-wide flex items-center dark:text-shadow
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
            className="py-3 px-4 border border-slate-300 rounded-lg text-[0.95rem]
                      transition-all duration-200 bg-white text-slate-800 font-medium
                      shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] placeholder:text-slate-400/80
                      focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-200"
          />
        </div>
        
        <div className="flex flex-col">
          <label 
            htmlFor="customAlias" 
            className="text-base font-semibold mb-2 text-slate-100 dark:text-slate-100
                      tracking-wide flex items-center dark:text-shadow
                      text-slate-800 dark:text-slate-100"
          >
            Custom Alias (Optional)
          </label>
          <div className="flex items-center">
            <span className="text-[0.95rem] text-slate-200 dark:text-slate-200 whitespace-nowrap pr-2 font-medium
                        text-slate-700 dark:text-slate-200">
              {origin}/
            </span>
            <input
              id="customAlias"
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="my-custom-alias"
              disabled={isSubmitting}
              className="py-3 px-4 border border-slate-300 rounded-lg text-[0.95rem] w-full
                        transition-all duration-200 bg-white text-slate-800 font-medium
                        shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] placeholder:text-slate-400/80
                        focus:outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-200"
            />
          </div>
          <p className="text-[0.8rem] text-slate-300 dark:text-slate-300 mt-2 italic
                      text-slate-500 dark:text-slate-300">
            Leave empty for a randomly generated alias
          </p>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !longUrl}
          className="bg-[var(--accent)] text-white py-[0.9rem] px-6 font-medium
                    border-none rounded-[10px] text-base cursor-pointer transition-all duration-200
                    mt-2 shadow-md shadow-indigo-200/20 disabled:bg-[var(--accent-light)]
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                    hover:bg-[var(--accent-dark)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200/25"
        >
          {isSubmitting ? "Processing..." : "Generate Short URL"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100/90 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-4
                      rounded-xl text-[0.95rem] mt-4 text-center border dark:border-red-300/30
                      border-red-200/80 shadow-lg shadow-red-200/15 font-medium">
          {error}
        </div>
      )}

      {shortenedUrl && (
        <div className="bg-emerald-50 dark:bg-gradient-to-b dark:from-emerald-900/40 dark:to-emerald-950/30
                      mt-6 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-600/40
                      shadow-lg shadow-emerald-100/8 dark:shadow-black/15">
          <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-5 text-lg tracking-tight
                       dark:text-shadow">
            Your shortened URL is ready!
          </p>
          <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 py-3.5 px-5
                        rounded-[10px] border border-emerald-100 dark:border-emerald-600/40
                        dark:shadow-md dark:shadow-black/15 dark:shadow-inner dark:from-white/5">
            <a 
              href={`${origin}/${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] dark:text-blue-300 no-underline overflow-hidden
                        text-ellipsis font-semibold text-[1.05rem] dark:text-shadow
                        hover:underline dark:hover:text-blue-200"
            >
              {`${origin}/${shortenedUrl}`}
            </a>
            <button 
              onClick={handleCopyToClipboard}
              type="button"
              className="bg-[var(--accent)] text-white border-none rounded-lg py-2.5 px-4
                        text-sm cursor-pointer transition-all duration-150 font-medium
                        hover:bg-[var(--accent-dark)] hover:-translate-y-0.5"
            >
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
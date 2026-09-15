"use client";

import { SAMPLE_PRESETS } from "@/lib/config";
import { countWords } from "@/lib/slugify";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

interface SingleGeneratorProps {
  title: string;
  onTitleChange: (value: string) => void;
  prefix: string;
  onPrefixChange: (value: string) => void;
  slug: string;
}

export function SingleGenerator({
  title,
  onTitleChange,
  prefix,
  onPrefixChange,
  slug,
}: SingleGeneratorProps) {
  const length = title.length;
  const words = countWords(title);
  const isEmpty = title.trim().length === 0;

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Sample Title Presets
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Sample title presets"
        >
          {SAMPLE_PRESETS.map((preset) => {
            const active = title === preset.value;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onTitleChange(preset.value)}
                aria-pressed={active}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
                  active
                    ? "border-teal-700 bg-teal-50 text-teal-900"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="article-title"
          className="text-sm font-medium text-slate-700"
        >
          Article Title / Name / Headline{" "}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="article-title"
          rows={3}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter headline or article title..."
          required
          aria-required="true"
          aria-describedby="title-stats"
          className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
        />
        <p id="title-stats" className="text-sm text-slate-500">
          Length:{" "}
          <span className="font-medium text-slate-700">{length}</span> characters
          {" · "}
          Words: <span className="font-medium text-slate-700">{words}</span>
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="domain-prefix"
          className="text-sm font-medium text-slate-700"
        >
          Domain / Directory Prefix
        </label>
        <input
          id="domain-prefix"
          type="text"
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          placeholder="https://himat.tech/blog/"
          spellCheck={false}
          autoComplete="off"
          aria-describedby="domain-prefix-hint"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
        />
        <p id="domain-prefix-hint" className="text-xs text-slate-500">
          Optional. Used only for URL preview and integration snippets — never
          sent to a server.
        </p>
      </div>

      <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-4 sm:p-5">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Generated Clean SEO Slug
            </h3>
            <p className="text-xs text-slate-600">
              {slug ? `${slug.length} characters` : "Waiting for input"}
            </p>
          </div>
          <CopyButton text={slug} label="Copy Slug" disabled={!slug} />
        </div>

        <div
          role="status"
          aria-live="polite"
          className="overflow-x-auto rounded-lg border border-teal-100 bg-white px-3 py-3"
        >
          {isEmpty ? (
            <p className="text-sm text-slate-400">
              Your SEO-friendly slug will appear here as you type…
            </p>
          ) : slug ? (
            <code className="block break-all font-mono text-sm text-teal-900 sm:text-base">
              {slug}
            </code>
          ) : (
            <p className="text-sm text-amber-700" role="alert">
              No slug could be generated from this input. Try adding letters or
              numbers.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

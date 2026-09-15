"use client";

import { Download, Files } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { buildCsv, downloadTextFile } from "@/lib/csv";
import { BATCH_SAMPLE } from "@/lib/config";

interface BatchRow {
  title: string;
  slug: string;
}

interface BatchGeneratorProps {
  input: string;
  onInputChange: (value: string) => void;
  rows: BatchRow[];
}

export function BatchGenerator({
  input,
  onInputChange,
  rows,
}: BatchGeneratorProps) {
  const allSlugs = rows.map((r) => r.slug).join("\n");
  const hasRows = rows.length > 0;

  const handleDownloadCsv = () => {
    if (!hasRows) return;
    const csv = buildCsv(rows);
    downloadTextFile(csv, "seo-slugs.csv", "text/csv;charset=utf-8");
  };

  const handleDownloadTxt = () => {
    if (!hasRows) return;
    downloadTextFile(allSlugs, "seo-slugs.txt", "text/plain;charset=utf-8");
  };

  const loadSample = () => {
    onInputChange(BATCH_SAMPLE);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="batch-titles"
            className="text-sm font-medium text-slate-700"
          >
            Titles (one per line)
          </label>
          <button
            type="button"
            onClick={loadSample}
            className="self-start text-sm font-medium text-teal-800 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Load sample list
          </button>
        </div>
        <textarea
          id="batch-titles"
          rows={8}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={
            "Best AI Tools for Developers\nHow to Build a SaaS Product\nModern SEO Strategies\nReact Performance Optimization"
          }
          aria-describedby="batch-hint"
          className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
        />
        <p id="batch-hint" className="text-xs text-slate-500">
          Each non-empty line is treated as an independent title. Empty lines
          are skipped.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <CopyButton
          text={allSlugs}
          label="Copy All Slugs"
          disabled={!hasRows}
          className="!bg-slate-900"
        />
        <button
          type="button"
          onClick={handleDownloadCsv}
          disabled={!hasRows}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download CSV
        </button>
        <button
          type="button"
          onClick={handleDownloadTxt}
          disabled={!hasRows}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Files className="h-4 w-4" aria-hidden="true" />
          Download TXT
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Batch Results
            {hasRows ? (
              <span className="ml-2 font-normal text-slate-500">
                ({rows.length} {rows.length === 1 ? "row" : "rows"})
              </span>
            ) : null}
          </h3>
        </div>

        {!hasRows ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            Paste multiple titles above to generate a table of clean SEO slugs.
          </p>
        ) : (
          <div className="overflow-x-auto" role="region" aria-label="Batch slug results" tabIndex={0}>
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-slate-700"
                  >
                    Original Title
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 font-semibold text-slate-700"
                  >
                    Generated Slug
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {rows.map((row, index) => (
                  <tr key={`${index}-${row.title}`} className="align-top">
                    <td className="max-w-xs px-4 py-3 text-slate-800 sm:max-w-md">
                      <span className="break-words">{row.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="break-all font-mono text-teal-900">
                        {row.slug || (
                          <span className="text-amber-700">
                            (empty — no usable characters)
                          </span>
                        )}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

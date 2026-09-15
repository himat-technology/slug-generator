"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_SLUG_OPTIONS,
  slugify,
  slugifyBatch,
} from "@/lib/slugify";
import {
  FormattingControls,
  type FormattingState,
} from "@/components/formatting-controls";
import { SingleGenerator } from "@/components/single-generator";
import { BatchGenerator } from "@/components/batch-generator";
import { IntegrationSnippets } from "@/components/integration-snippets";
import { SAMPLE_PRESETS } from "@/lib/config";
import { cn } from "@/lib/utils";

type Mode = "single" | "batch";

export function SlugGenerator() {
  const [mode, setMode] = useState<Mode>("single");
  const [formatting, setFormatting] = useState<FormattingState>({
    ...DEFAULT_SLUG_OPTIONS,
  });
  const [title, setTitle] = useState<string>(SAMPLE_PRESETS[0].value);
  const [prefix, setPrefix] = useState<string>("https://himat.tech/blog/");
  const [batchInput, setBatchInput] = useState<string>("");

  const slug = useMemo(
    () => slugify(title, formatting),
    [title, formatting],
  );

  const batchRows = useMemo(
    () => slugifyBatch(batchInput, formatting),
    [batchInput, formatting],
  );

  const handleReset = () => {
    setFormatting({ ...DEFAULT_SLUG_OPTIONS });
  };

  return (
    <div className="space-y-6">
      <FormattingControls
        value={formatting}
        onChange={setFormatting}
        onReset={handleReset}
      />

      <section
        aria-labelledby="generator-heading"
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="generator-heading"
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            Generator
          </h2>

          <div
            role="tablist"
            aria-label="Generator mode"
            className="inline-flex rounded-lg border border-slate-300 bg-slate-100 p-1"
          >
            <button
              type="button"
              role="tab"
              id="tab-single"
              aria-selected={mode === "single"}
              aria-controls="panel-single"
              tabIndex={mode === "single" ? 0 : -1}
              onClick={() => setMode("single")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600",
                mode === "single"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              Single Title
            </button>
            <button
              type="button"
              role="tab"
              id="tab-batch"
              aria-selected={mode === "batch"}
              aria-controls="panel-batch"
              tabIndex={mode === "batch" ? 0 : -1}
              onClick={() => setMode("batch")}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600",
                mode === "batch"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              Batch Generator
            </button>
          </div>
        </div>

        <div
          id="panel-single"
          role="tabpanel"
          aria-labelledby="tab-single"
          hidden={mode !== "single"}
        >
          {mode === "single" ? (
            <SingleGenerator
              title={title}
              onTitleChange={setTitle}
              prefix={prefix}
              onPrefixChange={setPrefix}
              slug={slug}
            />
          ) : null}
        </div>

        <div
          id="panel-batch"
          role="tabpanel"
          aria-labelledby="tab-batch"
          hidden={mode !== "batch"}
        >
          {mode === "batch" ? (
            <BatchGenerator
              input={batchInput}
              onInputChange={setBatchInput}
              rows={batchRows}
            />
          ) : null}
        </div>
      </section>

      {mode === "single" ? (
        <IntegrationSnippets title={title} slug={slug} prefix={prefix} />
      ) : null}
    </div>
  );
}

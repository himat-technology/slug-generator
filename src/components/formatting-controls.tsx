"use client";

import { RotateCcw } from "lucide-react";
import type {
  LetterCasing,
  NonAlphanumericMode,
  SlugOptions,
  WordSeparator,
} from "@/lib/slugify";
import {
  CASING_OPTIONS,
  NON_ALPHANUMERIC_OPTIONS,
  SEPARATOR_OPTIONS,
} from "@/lib/config";

export type FormattingState = Required<SlugOptions>;

interface FormattingControlsProps {
  value: FormattingState;
  onChange: (next: FormattingState) => void;
  onReset: () => void;
}

export function FormattingControls({
  value,
  onChange,
  onReset,
}: FormattingControlsProps) {
  const update = <K extends keyof FormattingState>(
    key: K,
    next: FormattingState[K],
  ) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <section
      aria-labelledby="formatting-controls-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="formatting-controls-heading"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          Slug Formatting Controls
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 self-start rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset Defaults
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="word-separator"
            className="text-sm font-medium text-slate-700"
          >
            Word Separator
          </label>
          <select
            id="word-separator"
            value={value.separator}
            onChange={(e) =>
              update("separator", e.target.value as WordSeparator)
            }
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
          >
            {SEPARATOR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="letter-casing"
            className="text-sm font-medium text-slate-700"
          >
            Letter Casing
          </label>
          <select
            id="letter-casing"
            value={value.casing}
            onChange={(e) => update("casing", e.target.value as LetterCasing)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
          >
            {CASING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="max-length"
            className="text-sm font-medium text-slate-700"
          >
            Max Length Cap
          </label>
          <input
            id="max-length"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={value.maxLength}
            onChange={(e) => {
              const raw = e.target.value;
              const parsed = Number.parseInt(raw, 10);
              update("maxLength", Number.isFinite(parsed) && parsed >= 0 ? parsed : 0);
            }}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
            aria-describedby="max-length-hint"
          />
          <p id="max-length-hint" className="text-xs text-slate-500">
            {value.maxLength === 0
              ? "0 = no limit"
              : `Slug will not exceed ${value.maxLength} characters`}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="non-alphanumeric"
            className="text-sm font-medium text-slate-700"
          >
            Non-Alphanumeric Characters
          </label>
          <select
            id="non-alphanumeric"
            value={value.nonAlphanumeric}
            onChange={(e) =>
              update(
                "nonAlphanumeric",
                e.target.value as NonAlphanumericMode,
              )
            }
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30"
          >
            {NON_ALPHANUMERIC_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="flex flex-col gap-3 sm:col-span-2 lg:col-span-2">
          <legend className="text-sm font-medium text-slate-700">
            Normalization Options
          </legend>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100">
            <input
              type="checkbox"
              checked={value.stripAccents}
              onChange={(e) => update("stripAccents", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus-visible:ring-teal-600"
            />
            <span>
              <span className="block text-sm font-medium text-slate-800">
                Strip Accents &amp; Diacritics
              </span>
              <span className="block text-xs text-slate-500">
                café résumé → cafe-resume
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100">
            <input
              type="checkbox"
              checked={value.removeStopWords}
              onChange={(e) => update("removeStopWords", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus-visible:ring-teal-600"
            />
            <span>
              <span className="block text-sm font-medium text-slate-800">
                Remove Common English Stop Words
              </span>
              <span className="block text-xs text-slate-500">
                the best tools for developers → best-tools-developers
              </span>
            </span>
          </label>
        </fieldset>
      </div>
    </section>
  );
}

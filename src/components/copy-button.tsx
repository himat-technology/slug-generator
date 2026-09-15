"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard, cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel?: string;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

export function CopyButton({
  text,
  label,
  copiedLabel = "Copied!",
  className,
  disabled = false,
  size = "md",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!text || disabled) return;

    const ok = await copyToClipboard(text);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (ok) {
      setCopied(true);
      setError(null);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } else {
      setError("Copy failed — select and copy manually.");
      setCopied(false);
      timerRef.current = setTimeout(() => setError(null), 3000);
    }
  }, [text, disabled]);

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled || !text}
        aria-live="polite"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm",
          copied
            ? "bg-teal-700 text-white"
            : "bg-slate-900 text-white hover:bg-slate-800",
          className,
        )}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            <span>{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
          </>
        )}
      </button>
      {error ? (
        <span role="alert" className="text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

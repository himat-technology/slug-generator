"use client";

import { CopyButton } from "@/components/copy-button";
import {
  buildFullUrl,
  buildHtmlLink,
  buildMarkdownLink,
} from "@/lib/utils";

interface IntegrationSnippetsProps {
  title: string;
  slug: string;
  prefix: string;
}

export function IntegrationSnippets({
  title,
  slug,
  prefix,
}: IntegrationSnippetsProps) {
  const displayTitle = title.trim() || "Example Title";
  const href = buildFullUrl(prefix, slug);
  const html = href ? buildHtmlLink(displayTitle, href) : "";
  const markdown = href ? buildMarkdownLink(displayTitle, href) : "";
  const hasSlug = Boolean(slug);

  return (
    <section
      aria-labelledby="integration-snippets-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2
        id="integration-snippets-heading"
        className="mb-4 text-lg font-semibold tracking-tight text-slate-900"
      >
        Integration Snippets &amp; Links
      </h2>

      {!hasSlug ? (
        <p className="text-sm text-slate-500">
          Enter a title to generate full URL, HTML, and Markdown snippets.
        </p>
      ) : (
        <ul className="space-y-4">
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-700">Full URL</p>
              <CopyButton
                text={href}
                label="Copy URL"
                size="sm"
                disabled={!href}
              />
            </div>
            <code className="block break-all font-mono text-sm text-slate-900">
              {href || "Add a domain prefix to preview a full URL."}
            </code>
          </li>

          <li className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-700">HTML Link</p>
              <CopyButton
                text={html}
                label="Copy HTML"
                size="sm"
                disabled={!html}
              />
            </div>
            <code className="block break-all font-mono text-sm text-slate-900">
              {html}
            </code>
          </li>

          <li className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-700">Markdown</p>
              <CopyButton
                text={markdown}
                label="Copy MD"
                size="sm"
                disabled={!markdown}
              />
            </div>
            <code className="block break-all font-mono text-sm text-slate-900">
              {markdown}
            </code>
          </li>
        </ul>
      )}
    </section>
  );
}

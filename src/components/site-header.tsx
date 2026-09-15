import { Github, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { DemoLinkButton, SocialLinks } from "@/components/social-links";

export function SiteHeader() {
  const repoUrl = siteConfig.repositoryUrl.trim();

  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent"
      />
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.08em] text-teal-800 uppercase">
              {siteConfig.siteName}
            </p>
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.1rem] lg:leading-tight">
              {siteConfig.toolName}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-start lg:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-900 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              100% Browser-Local Processing &amp; Privacy First
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <DemoLinkButton />
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Open Source
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Follow HiMat Technology
          </p>
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}

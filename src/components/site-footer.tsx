import { Github } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { DemoLinkButton, SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const repoUrl = siteConfig.repositoryUrl.trim();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-3">
            <p className="text-sm font-semibold tracking-wide text-teal-800">
              {siteConfig.siteName}
            </p>
            <p className="text-base font-semibold text-slate-900">
              {siteConfig.toolName}
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              100% browser-local processing. No accounts. No tracking of your
              titles. Built for privacy-first SEO workflows.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <DemoLinkButton />
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View source
                </a>
              ) : null}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Connect with us
            </p>
            <SocialLinks />
            <ul className="space-y-1.5 pt-1 text-sm text-slate-600">
              <li>
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-800 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  Live demo on himat.tech
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  LinkedIn company page
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  Facebook page
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  Instagram @himat_technology
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.siteName}. All rights reserved.
          </p>
          <p>MIT licensed · Privacy-first developer utility</p>
        </div>
      </div>
    </footer>
  );
}

import {
  Download,
  EyeOff,
  FileCode2,
  Languages,
  Link2,
  ListOrdered,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "100% Client-Side Privacy",
    body: "Draft titles, proprietary headlines, and product names are transformed strictly in browser memory. Zero network requests for slug generation.",
  },
  {
    icon: Languages,
    title: "Diacritics & Accent Normalization",
    body: "Uses native Unicode normalization to transliterate accented characters (é → e, ñ → n, ü → u, æ → ae, ø → o) when enabled.",
  },
  {
    icon: EyeOff,
    title: "Stop Words Removal Engine",
    body: "Optionally strip common English stop words (a, an, the, and, or, for, in, on, of, to, with) for concise, keyword-focused slugs.",
  },
  {
    icon: Link2,
    title: "Flexible Separators & Case Controls",
    body: "Switch between hyphens, underscores, and dots alongside lowercase, uppercase, or original casing — with an easy path to custom delimiters.",
  },
  {
    icon: ListOrdered,
    title: "Multi-Line Batch Generation",
    body: "Convert lists of titles simultaneously into sanitized URL slugs. Results update live when formatting settings change.",
  },
  {
    icon: Download,
    title: "Multi-Format Copy & File Download",
    body: "Copy raw slugs, HTML anchors, Markdown links, or download CSV/TXT batch files — all generated with browser Blob APIs.",
  },
] as const;

const STEPS = [
  {
    n: "1",
    title: "Enter Article Title or Text",
    body: "Type or paste your headline, product title, or multi-line list into the single or batch generator input.",
  },
  {
    n: "2",
    title: "Configure Formatting Rules",
    body: "Select word separator, casing style, max length, accent stripping, and English stop-word filtering.",
  },
  {
    n: "3",
    title: "Copy Slug or Export Batch",
    body: "Copy the sanitized URL slug, full URL preview, HTML or Markdown snippet, or download batch results as CSV/TXT.",
  },
] as const;

const FAQ = [
  {
    q: "What is a URL slug and why is it important for SEO?",
    a: "A URL slug is the readable, keyword-rich section of a web page address. Clean slugs improve search ranking signals, click-through rates, and URL readability.",
  },
  {
    q: "Is my text payload or headline data sent to a server?",
    a: "No. This Slug Generator & URL Cleaner operates 100% locally in your web browser. Titles, product names, and generated slugs never leave your device.",
  },
  {
    q: "How does diacritics and accent stripping work?",
    a: "The engine uses native browser Unicode normalization (String.prototype.normalize('NFD')) to strip combining diacritical marks, converting text like “café résumé” into “cafe-resume”.",
  },
  {
    q: "Why should I remove stop words from URL slugs?",
    a: "Removing stop words creates shorter URLs that keep primary keywords near the front, improving mobile readability and social sharing.",
  },
] as const;

export function InfoSections() {
  return (
    <div className="space-y-12">
      <section aria-labelledby="how-to-heading" className="space-y-6">
        <h2
          id="how-to-heading"
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          How to Use the SEO Slug Generator &amp; URL Cleaner
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-900">
                {step.n}
              </span>
              <h3 className="mb-2 font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="features-heading" className="space-y-6">
        <h2
          id="features-heading"
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          Features
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 inline-flex rounded-md bg-slate-100 p-2 text-slate-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {feature.body}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="privacy-heading"
        className="rounded-xl border border-teal-200 bg-teal-50/70 p-6 sm:p-8"
      >
        <div className="mb-3 inline-flex items-center gap-2 text-teal-900">
          <FileCode2 className="h-5 w-5" aria-hidden="true" />
          <h2
            id="privacy-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Your Draft Titles &amp; Content Strings Stay On Your Device
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-teal-950/80 sm:text-base">
          This Slug Generator operates 100% locally in your web browser. Neither
          your article titles, unpublished blog drafts, product names, nor
          generated URL slugs are ever transmitted over the network. There are
          no API routes for slug generation and no external AI services.
        </p>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <h2
          id="faq-heading"
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-slate-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

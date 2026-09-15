import { SlugGenerator } from "@/components/slug-generator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InfoSections } from "@/components/info-sections";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.toolName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: siteConfig.longDescription,
    url: siteConfig.siteUrl,
    creator: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript. All processing runs client-side.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Safe: constructed from static config strings only (no user input).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-5xl space-y-12 px-4 py-8 sm:px-6 lg:px-8"
      >
        <SlugGenerator />
        <InfoSections />
      </main>
      <SiteFooter />
    </>
  );
}

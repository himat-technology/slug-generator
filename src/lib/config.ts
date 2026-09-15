/**
 * Site / branding configuration.
 * Values come from NEXT_PUBLIC_* env vars so they are safe for the client bundle.
 * No secrets are required for this application.
 */
export const siteConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "HiMat Technology",
  toolName:
    process.env.NEXT_PUBLIC_TOOL_NAME || "SEO Slug Generator & URL Cleaner",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/+$/,
    "",
  ),
  repositoryUrl: process.env.NEXT_PUBLIC_REPOSITORY_URL || "",
  demoUrl:
    process.env.NEXT_PUBLIC_DEMO_URL ||
    "https://himat.tech/free-tools/slug-generator",
  social: {
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      "https://www.facebook.com/people/Himat-technology/61593829197445/",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://www.linkedin.com/company/himat-technology",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/himat_technology?igsi=djdmcGxweWtwYWI0",
  },
  description:
    "Convert blog titles, headlines, product names, and strings into clean, sanitized, SEO-friendly URL slugs.",
  longDescription:
    "Generate clean, SEO-friendly URL slugs from titles and text with browser-local processing, accent stripping, stop-word removal, batch generation, and export tools.",
} as const;

export const SAMPLE_PRESETS = [
  {
    id: "blog",
    label: "Blog Post Title",
    value:
      "10 Best AI Development Tools for Modern Software Engineers in 2026",
  },
  {
    id: "ecommerce",
    label: "E-Commerce Product",
    value: "Premium Wireless Noise Cancelling Headphones",
  },
  {
    id: "accented",
    label: "Accented Multi-Language",
    value: "Café résumé — élève naïve déjà vu",
  },
  {
    id: "code",
    label: "Code & API Identifier",
    value: "REST API Authentication & Developer Integration Guide",
  },
] as const;

export const BATCH_SAMPLE = [
  "Best AI Tools for Developers",
  "How to Build a SaaS Product",
  "Modern SEO Strategies",
  "React Performance Optimization",
].join("\n");

export const SEPARATOR_OPTIONS = [
  { value: "-", label: "Hyphen (-)" },
  { value: "_", label: "Underscore (_)" },
  { value: ".", label: "Dot (.)" },
] as const;

export const CASING_OPTIONS = [
  { value: "lowercase", label: "lowercase" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "original", label: "Original casing" },
] as const;

export const NON_ALPHANUMERIC_OPTIONS = [
  { value: "remove", label: "Remove" },
  { value: "replace", label: "Replace with separator" },
] as const;

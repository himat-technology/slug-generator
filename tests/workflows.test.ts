/**
 * End-to-end workflow verification for core lib (no browser needed).
 * Run: npx vitest run tests/workflows.test.ts
 */
import { describe, expect, it } from "vitest";
import {
  DEFAULT_SLUG_OPTIONS,
  slugify,
  slugifyBatch,
  countWords,
} from "../src/lib/slugify";
import { buildCsv } from "../src/lib/csv";
import {
  buildFullUrl,
  buildHtmlLink,
  buildMarkdownLink,
  escapeHtml,
} from "../src/lib/utils";
import { siteConfig, SAMPLE_PRESETS } from "../src/lib/config";

describe("full single-title workflow", () => {
  const title = SAMPLE_PRESETS[0].value;

  it("1. generates slug from title", () => {
    expect(slugify(title)).toBe(
      "10-best-ai-development-tools-for-modern-software-engineers-in-2026",
    );
  });

  it("2. changes separator", () => {
    expect(slugify(title, { separator: "_" })).toBe(
      "10_best_ai_development_tools_for_modern_software_engineers_in_2026",
    );
    expect(slugify(title, { separator: "." })).toBe(
      "10.best.ai.development.tools.for.modern.software.engineers.in.2026",
    );
  });

  it("3. changes casing", () => {
    expect(slugify("Hello World", { casing: "uppercase" })).toBe("HELLO-WORLD");
    expect(slugify("Hello World", { casing: "original" })).toBe("Hello-World");
  });

  it("4. accent stripping", () => {
    expect(slugify(SAMPLE_PRESETS[2].value, { stripAccents: true })).toBe(
      "cafe-resume-eleve-naive-deja-vu",
    );
  });

  it("5. stop-word removal", () => {
    expect(
      slugify("The Best Tools for Developers", { removeStopWords: true }),
    ).toBe("best-tools-developers");
  });

  it("6. max length", () => {
    const slug = slugify(title, { maxLength: 40 });
    expect(slug.length).toBeLessThanOrEqual(40);
    expect(slug).not.toMatch(/-$/);
  });

  it("7. domain prefix + snippets", () => {
    const slug = slugify(title);
    const url = buildFullUrl("https://himat.tech/blog/", slug);
    expect(url).toBe(
      "https://himat.tech/blog/10-best-ai-development-tools-for-modern-software-engineers-in-2026",
    );
    expect(buildHtmlLink(title, url)).toContain("<a href=");
    expect(buildHtmlLink(title, url)).toContain(escapeHtml(title));
    expect(buildMarkdownLink(title, url)).toBe(`[${title}](${url})`);
  });

  it("8. reset defaults shape", () => {
    expect(DEFAULT_SLUG_OPTIONS).toMatchObject({
      separator: "-",
      casing: "lowercase",
      maxLength: 0,
      stripAccents: true,
      removeStopWords: false,
    });
  });

  it("9. live stats helpers", () => {
    expect(countWords(title)).toBe(11);
    expect(title.length).toBeGreaterThan(50);
  });
});

describe("batch workflow", () => {
  const input = [
    "Best AI Tools for Developers",
    "How to Build a SaaS Product",
    "Modern SEO Strategies",
    "React Performance Optimization",
  ].join("\n");

  it("10. generates batch rows", () => {
    const rows = slugifyBatch(input, { removeStopWords: true });
    expect(rows).toHaveLength(4);
    expect(rows[0].slug).toBe("best-ai-tools-developers");
    expect(rows[3].slug).toBe("react-performance-optimization");
  });

  it("11. CSV export content", () => {
    const rows = slugifyBatch(input);
    const csv = buildCsv(rows);
    expect(csv.startsWith("title,slug\n")).toBe(true);
    expect(csv.split("\n")).toHaveLength(5);
  });

  it("12. TXT export content", () => {
    const rows = slugifyBatch(input);
    const txt = rows.map((r) => r.slug).join("\n");
    expect(txt.split("\n")).toHaveLength(4);
    expect(txt).toContain("best-ai-tools-for-developers");
  });
});

describe("branding & social config", () => {
  it("exposes demo and social URLs", () => {
    expect(siteConfig.demoUrl).toBe(
      "https://himat.tech/free-tools/slug-generator",
    );
    expect(siteConfig.social.facebook).toContain("facebook.com");
    expect(siteConfig.social.linkedin).toContain("linkedin.com/company/himat-technology");
    expect(siteConfig.social.instagram).toContain("instagram.com/himat_technology");
  });
});

import { describe, expect, it } from "vitest";
import {
  DEFAULT_SLUG_OPTIONS,
  countWords,
  slugify,
  slugifyBatch,
} from "../src/lib/slugify";
import { buildCsv, escapeCsvField } from "../src/lib/csv";
import {
  buildFullUrl,
  buildHtmlLink,
  buildMarkdownLink,
  escapeHtml,
} from "../src/lib/utils";

describe("slugify — basics", () => {
  it("generates a basic hyphenated lowercase slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("trims whitespace and collapses repeated spaces", () => {
    expect(slugify("  Hello   World  ")).toBe("hello-world");
  });

  it("removes punctuation without leaving repeated separators", () => {
    expect(slugify("Hello, World!!!")).toBe("hello-world");
    expect(slugify("--Hello---World--")).toBe("hello-world");
  });

  it("returns empty string for empty / whitespace input", () => {
    expect(slugify("")).toBe("");
    expect(slugify("   ")).toBe("");
  });

  it("handles symbols and quotes", () => {
    expect(slugify(`"Hello" World's Best!`)).toBe("hello-worlds-best");
    expect(slugify("Price: $99 (sale)")).toBe("price-99-sale");
  });

  it("converts ampersands to and", () => {
    expect(slugify("REST API Authentication & Developer Guide")).toBe(
      "rest-api-authentication-and-developer-guide",
    );
  });

  it("strips emojis", () => {
    expect(slugify("Hello 👋 World 🌍")).toBe("hello-world");
  });
});

describe("slugify — casing", () => {
  it("applies lowercase by default", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("supports UPPERCASE", () => {
    expect(slugify("Hello World", { casing: "uppercase" })).toBe("HELLO-WORLD");
  });

  it("supports original casing", () => {
    expect(slugify("Hello World", { casing: "original" })).toBe("Hello-World");
  });
});

describe("slugify — separators", () => {
  it("supports underscore separator", () => {
    expect(slugify("Hello World", { separator: "_" })).toBe("hello_world");
  });

  it("supports dot separator", () => {
    expect(slugify("Hello World", { separator: "." })).toBe("hello.world");
  });

  it("does not produce leading/trailing separators", () => {
    expect(slugify("!!!Hello World!!!", { separator: "-" })).toBe("hello-world");
  });
});

describe("slugify — accents", () => {
  it("strips accents when enabled", () => {
    expect(slugify("Café résumé", { stripAccents: true })).toBe("cafe-resume");
  });

  it("handles æ and ø ligatures", () => {
    expect(slugify("æther øre", { stripAccents: true })).toBe("aether-ore");
  });

  it("handles ñ and ü", () => {
    expect(slugify("señor über", { stripAccents: true })).toBe("senor-uber");
  });

  it("preserves unicode letters when accent stripping is disabled", () => {
    const result = slugify("Café", {
      stripAccents: false,
      casing: "original",
    });
    expect(result).toBe("Café");
  });
});

describe("slugify — stop words", () => {
  it("removes common English stop words when enabled", () => {
    expect(
      slugify("The Best Tools for Developers", { removeStopWords: true }),
    ).toBe("best-tools-developers");
  });

  it("keeps stop words when disabled", () => {
    expect(
      slugify("The Best Tools for Developers", { removeStopWords: false }),
    ).toBe("the-best-tools-for-developers");
  });

  it("matches the product example", () => {
    expect(
      slugify("The Best AI Tools for Developers", { removeStopWords: true }),
    ).toBe("best-ai-tools-developers");
  });
});

describe("slugify — max length", () => {
  it("treats 0 as no limit", () => {
    const input = "one two three four five six";
    expect(slugify(input, { maxLength: 0 })).toBe(
      "one-two-three-four-five-six",
    );
  });

  it("truncates at word boundaries when possible", () => {
    expect(
      slugify("best ai tools for developers", { maxLength: 12 }),
    ).toBe("best-ai");
  });

  it("does not exceed the max length", () => {
    const slug = slugify(
      "10 Best AI Development Tools for Modern Software Engineers in 2026",
      { maxLength: 40 },
    );
    expect(slug.length).toBeLessThanOrEqual(40);
    expect(slug).not.toMatch(/-$/);
  });
});

describe("slugify — unicode & resilience", () => {
  it("handles CJK without crashing", () => {
    const result = slugify("你好世界 Hello", { stripAccents: false });
    expect(result.includes("hello")).toBe(true);
    expect(typeof result).toBe("string");
  });

  it("handles newlines in input", () => {
    expect(slugify("Hello\nWorld\r\nAgain")).toBe("hello-world-again");
  });

  it("uses default options shape", () => {
    expect(DEFAULT_SLUG_OPTIONS.separator).toBe("-");
    expect(DEFAULT_SLUG_OPTIONS.casing).toBe("lowercase");
    expect(DEFAULT_SLUG_OPTIONS.maxLength).toBe(0);
    expect(DEFAULT_SLUG_OPTIONS.stripAccents).toBe(true);
    expect(DEFAULT_SLUG_OPTIONS.removeStopWords).toBe(false);
  });
});

describe("slugifyBatch", () => {
  it("processes each non-empty line independently", () => {
    const rows = slugifyBatch(
      [
        "Best AI Tools for Developers",
        "",
        "How to Build a SaaS Product",
        "Modern SEO Strategies",
      ].join("\n"),
      { removeStopWords: true },
    );

    expect(rows).toEqual([
      {
        title: "Best AI Tools for Developers",
        slug: "best-ai-tools-developers",
      },
      {
        title: "How to Build a SaaS Product",
        slug: "how-build-saas-product",
      },
      {
        title: "Modern SEO Strategies",
        slug: "modern-seo-strategies",
      },
    ]);
  });

  it("returns empty array for blank input", () => {
    expect(slugifyBatch("")).toEqual([]);
    expect(slugifyBatch("\n\n")).toEqual([]);
  });
});

describe("countWords", () => {
  it("counts whitespace-separated words", () => {
    expect(countWords("one two three")).toBe(3);
    expect(countWords("")).toBe(0);
    expect(countWords("  spaced   out  ")).toBe(2);
  });
});

describe("csv helpers", () => {
  it("escapes fields with commas and quotes", () => {
    expect(escapeCsvField('Hello, "World"')).toBe('"Hello, ""World"""');
  });

  it("builds a valid CSV document", () => {
    const csv = buildCsv([
      { title: "Hello, World", slug: "hello-world" },
      { title: 'Say "Hi"', slug: "say-hi" },
    ]);
    expect(csv).toBe(
      ['title,slug', '"Hello, World",hello-world', '"Say ""Hi""",say-hi'].join(
        "\n",
      ),
    );
  });
});

describe("url / snippet helpers", () => {
  it("joins prefix and slug safely", () => {
    expect(buildFullUrl("https://himat.tech/blog/", "hello-world")).toBe(
      "https://himat.tech/blog/hello-world",
    );
    expect(buildFullUrl("https://himat.tech/blog", "hello-world")).toBe(
      "https://himat.tech/blog/hello-world",
    );
  });

  it("escapes HTML entities in snippets", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
    expect(buildHtmlLink(`A & B <C>`, "https://example.com/a-b")).toBe(
      '<a href="https://example.com/a-b">A &amp; B &lt;C&gt;</a>',
    );
  });

  it("builds markdown links", () => {
    expect(buildMarkdownLink("Hello", "https://example.com/hello")).toBe(
      "[Hello](https://example.com/hello)",
    );
  });
});

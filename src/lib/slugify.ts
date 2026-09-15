import { STOP_WORD_SET } from "./stop-words";

export type WordSeparator = "-" | "_" | "." | string;

export type LetterCasing = "lowercase" | "uppercase" | "original";

export type NonAlphanumericMode = "remove" | "replace";

export interface SlugOptions {
  /** Word separator. Default: "-" */
  separator?: WordSeparator;
  /** Letter casing rule. Default: "lowercase" */
  casing?: LetterCasing;
  /**
   * Maximum slug length. `0` means no limit.
   * When truncating, prefer cutting at separator boundaries.
   */
  maxLength?: number;
  /** Strip accents/diacritics via Unicode NFD. Default: true */
  stripAccents?: boolean;
  /** Remove common English stop words. Default: false */
  removeStopWords?: boolean;
  /**
   * How to handle non-alphanumeric characters.
   * - remove: drop them (default)
   * - replace: replace with separator
   */
  nonAlphanumeric?: NonAlphanumericMode;
}

export const DEFAULT_SLUG_OPTIONS: Required<SlugOptions> = {
  separator: "-",
  casing: "lowercase",
  maxLength: 0,
  stripAccents: true,
  removeStopWords: false,
  nonAlphanumeric: "remove",
};

/** Ligatures / special letters that NFD alone does not fully expand. */
const SPECIAL_TRANSLITERATIONS: Record<string, string> = {
  æ: "ae",
  Æ: "AE",
  œ: "oe",
  Œ: "OE",
  ø: "o",
  Ø: "O",
  ð: "d",
  Ð: "D",
  þ: "th",
  Þ: "Th",
  ß: "ss",
  ł: "l",
  Ł: "L",
  đ: "d",
  Đ: "D",
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applySpecialTransliterations(input: string): string {
  return input.replace(/[æÆœŒøØðÐþÞßłŁđĐ]/g, (char) => SPECIAL_TRANSLITERATIONS[char] ?? char);
}

function stripDiacritics(input: string): string {
  return input.normalize("NFD").replace(/\p{M}+/gu, "");
}

function applyCasing(token: string, casing: LetterCasing): string {
  switch (casing) {
    case "lowercase":
      return token.toLowerCase();
    case "uppercase":
      return token.toUpperCase();
    case "original":
    default:
      return token;
  }
}

/**
 * Truncate a slug without cutting mid-word when a separator is present.
 * Falls back to hard truncate if no safe boundary exists within the limit.
 */
function applyMaxLength(slug: string, maxLength: number, separator: string): string {
  if (!maxLength || maxLength <= 0 || slug.length <= maxLength) {
    return slug;
  }

  const truncated = slug.slice(0, maxLength);
  if (!separator) {
    return truncated.replace(/[-_.]+$/g, "");
  }

  const sep = escapeRegExp(separator);
  const lastSep = truncated.lastIndexOf(separator);

  // Prefer cutting at the last full word boundary inside the limit.
  if (lastSep > 0) {
    return truncated.slice(0, lastSep).replace(new RegExp(`${sep}+$`), "");
  }

  return truncated.replace(new RegExp(`${sep}+$`), "");
}

/**
 * Convert a title/string into a clean, URL-safe SEO slug.
 * Fully synchronous and browser-safe — no network or Node-only APIs.
 */
export function slugify(input: string, options: Partial<SlugOptions> = {}): string {
  const opts: Required<SlugOptions> = {
    ...DEFAULT_SLUG_OPTIONS,
    ...options,
  };

  const separator = opts.separator || "-";
  const sepEscaped = escapeRegExp(separator);

  if (typeof input !== "string" || input.length === 0) {
    return "";
  }

  let text = input.trim();
  if (!text) {
    return "";
  }

  // Normalize Unicode (composition form first for consistency)
  text = text.normalize("NFC");

  // Ampersands → "and" before punctuation stripping
  text = text.replace(/&+/g, " and ");

  // Possessive / contraction apostrophes should not create word breaks
  // World's → Worlds, don't → dont
  text = text.replace(/['’ʻʹ]/g, "");

  // Optional accent / diacritic stripping + ligature expansion
  if (opts.stripAccents) {
    text = applySpecialTransliterations(text);
    text = stripDiacritics(text);
  }

  // Normalize newlines / tabs to spaces
  text = text.replace(/[\r\n\t]+/g, " ");

  // Handle non-alphanumeric characters
  if (opts.nonAlphanumeric === "replace") {
    // Keep letters, numbers, spaces, and the chosen separator; replace the rest
    text = text.replace(new RegExp(`[^\\p{L}\\p{N}\\s${sepEscaped}]+`, "gu"), separator);
  } else {
    // Remove punctuation/symbols but keep letters, numbers, and spaces
    text = text.replace(new RegExp(`[^\\p{L}\\p{N}\\s]+`, "gu"), " ");
  }

  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Split into tokens
  let tokens = text.split(" ").filter(Boolean);

  // Optional stop-word removal (case-insensitive match)
  if (opts.removeStopWords) {
    tokens = tokens.filter((token) => {
      const normalized = opts.stripAccents
        ? stripDiacritics(applySpecialTransliterations(token)).toLowerCase()
        : token.toLowerCase();
      return !STOP_WORD_SET.has(normalized);
    });
  }

  if (tokens.length === 0) {
    return "";
  }

  // Apply casing per token, then join
  const cased = tokens.map((token) => applyCasing(token, opts.casing));
  let slug = cased.join(separator);

  // Collapse repeated separators and trim edges
  slug = slug
    .replace(new RegExp(`${sepEscaped}{2,}`, "g"), separator)
    .replace(new RegExp(`^${sepEscaped}+|${sepEscaped}+$`, "g"), "");

  // Max length (prefer word boundaries)
  slug = applyMaxLength(slug, opts.maxLength, separator);

  // Final cleanup after truncation
  slug = slug
    .replace(new RegExp(`${sepEscaped}{2,}`, "g"), separator)
    .replace(new RegExp(`^${sepEscaped}+|${sepEscaped}+$`, "g"), "");

  return slug;
}

/**
 * Process multiple titles (one per line) into slug pairs.
 * Empty / whitespace-only lines are skipped.
 */
export function slugifyBatch(
  multilineInput: string,
  options: Partial<SlugOptions> = {},
): Array<{ title: string; slug: string }> {
  if (!multilineInput) {
    return [];
  }

  return multilineInput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((title) => ({
      title,
      slug: slugify(title, options),
    }));
}

/** Count words in a title (whitespace-separated). */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

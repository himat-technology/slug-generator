/**
 * Common English stop words used for optional SEO slug shortening.
 * Extend this list as needed — keep entries lowercase.
 *
 * Kept intentionally conservative so meaningful title words
 * (e.g. "how", "why", "guide") are not stripped by default.
 */
export const ENGLISH_STOP_WORDS: readonly string[] = [
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "in",
  "on",
  "of",
  "to",
  "with",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "by",
  "at",
  "from",
  "as",
  "into",
  "that",
  "this",
  "these",
  "those",
  "it",
  "its",
] as const;

export const STOP_WORD_SET = new Set(ENGLISH_STOP_WORDS);

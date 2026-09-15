/**
 * Escape text for safe inclusion in an HTML attribute or text node.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Join a domain/directory prefix with a slug to form a preview URL.
 * Handles missing/trailing slashes and empty inputs gracefully.
 */
export function buildFullUrl(prefix: string, slug: string): string {
  const cleanSlug = slug.trim();
  const rawPrefix = prefix.trim();

  if (!cleanSlug && !rawPrefix) {
    return "";
  }

  if (!rawPrefix) {
    return cleanSlug;
  }

  if (!cleanSlug) {
    return rawPrefix;
  }

  // If prefix looks like a full URL or path, join carefully
  const normalizedPrefix = rawPrefix.replace(/\/+$/, "");
  return `${normalizedPrefix}/${cleanSlug}`;
}

/**
 * Build a safely escaped HTML anchor snippet.
 */
export function buildHtmlLink(title: string, href: string): string {
  const safeHref = escapeHtml(href);
  const safeTitle = escapeHtml(title);
  return `<a href="${safeHref}">${safeTitle}</a>`;
}

/**
 * Build a Markdown link. Titles with brackets are escaped lightly.
 */
export function buildMarkdownLink(title: string, href: string): string {
  const safeTitle = title.replace(/[[\]]/g, "\\$&");
  return `[${safeTitle}](${href})`;
}

/**
 * Copy text to the clipboard. Returns true on success.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    return false;
  }

  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to legacy path
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/** Simple className joiner. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

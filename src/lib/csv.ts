/**
 * Escape a single CSV field per RFC 4180.
 * Fields containing commas, quotes, or newlines are wrapped in double quotes
 * with internal quotes doubled.
 */
export function escapeCsvField(value: string): string {
  const needsQuoting = /[",\r\n]/.test(value);
  if (!needsQuoting) {
    return value;
  }
  return `"${value.replace(/"/g, '""')}"`;
}

/**
 * Build a CSV document from title/slug pairs.
 */
export function buildCsv(rows: Array<{ title: string; slug: string }>): string {
  const header = "title,slug";
  const lines = rows.map(
    (row) => `${escapeCsvField(row.title)},${escapeCsvField(row.slug)}`,
  );
  return [header, ...lines].join("\n");
}

/**
 * Trigger a browser download for a text blob.
 */
export function downloadTextFile(
  content: string,
  filename: string,
  mimeType = "text/plain;charset=utf-8",
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

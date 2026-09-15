# SEO Slug Generator & URL Cleaner

Convert blog titles, headlines, product names, and strings into clean, sanitized, SEO-friendly URL slugs — entirely in your browser.

A polished, privacy-first recreation of the HiMat Technology slug tool — fully local, open, and production-ready with no backend processing.

---

## Live Demo & HiMat Technology

| | Link |
| --- | --- |
| **Live Demo** | [himat.tech/free-tools/slug-generator](https://himat.tech/free-tools/slug-generator) |
| **Facebook** | [HiMat Technology](https://www.facebook.com/people/Himat-technology/61593829197445/) |
| **LinkedIn** | [company/himat-technology](https://www.linkedin.com/company/himat-technology) |
| **Instagram** | [@himat_technology](https://www.instagram.com/himat_technology?igsi=djdmcGxweWtwYWI0) |

> Try the official demo online, then run this repository locally for the same browser-local workflow with full source control.

---

## Features

- **Browser-local processing** — titles and slugs never leave your device
- **SEO-friendly slug generation** with live preview
- **Accent / diacritic stripping** via Unicode NFD normalization
- **English stop-word removal** (extensible list)
- **Multiple separators** — hyphen, underscore, dot (custom delimiter-ready)
- **Multiple casing modes** — lowercase, UPPERCASE, original
- **Maximum length control** with word-boundary-aware truncation
- **Single-title generation** with sample presets
- **Batch generation** with live table updates
- **URL preview** via configurable domain / directory prefix
- **HTML snippet generation** (safely escaped)
- **Markdown link generation**
- **CSV export** and **TXT export** via browser `Blob` APIs
- **Accessible, responsive UI** with social + demo links

## Privacy

**100% Browser-Local Processing & Privacy First**

All slug generation, formatting, copying, and file exports happen inside the browser. This app does **not**:

- send titles, product names, or generated slugs to a server
- expose API routes for slug generation
- call external AI APIs
- require authentication or a database

User-entered content stays in browser memory only.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Lucide React icons
- Vitest (unit tests)

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Testing

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Environment Configuration

Copy the example env file and adjust public branding values as needed:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_NAME=HiMat Technology
NEXT_PUBLIC_TOOL_NAME=SEO Slug Generator & URL Cleaner
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REPOSITORY_URL=
NEXT_PUBLIC_DEMO_URL=https://himat.tech/free-tools/slug-generator
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/people/Himat-technology/61593829197445/
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/himat-technology
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/himat_technology?igsi=djdmcGxweWtwYWI0
```

Set `NEXT_PUBLIC_REPOSITORY_URL` to your real repository URL when available. Leave it empty rather than inventing a GitHub link. No secrets are required.

## Architecture

```text
slug-generator/
├── app/                 # Next.js App Router (layout, page, styles)
├── components/          # UI: controls, single/batch modes, snippets, social
├── lib/
│   ├── slugify.ts       # Core slug algorithm (browser-safe)
│   ├── stop-words.ts    # Extensible English stop-word list
│   ├── csv.ts           # CSV escaping + download helpers
│   ├── utils.ts         # URL/HTML/Markdown + clipboard helpers
│   └── config.ts        # Branding, social links, presets, options
└── tests/               # Vitest unit tests for the slug engine
```

### Client-side design

- The generator UI is a React client component.
- `slugify()` / `slugifyBatch()` run synchronously in the browser.
- Copy actions use the Clipboard API (with a safe fallback).
- CSV/TXT downloads use `Blob` + `URL.createObjectURL`.
- There are **no** API routes for text processing.

### Slug algorithm (summary)

1. Trim whitespace  
2. Normalize Unicode  
3. Optionally strip diacritics / expand ligatures  
4. Optionally remove stop words  
5. Convert `&` → `and`  
6. Remove or replace unwanted punctuation  
7. Join tokens with the selected separator  
8. Collapse repeated separators; trim edges  
9. Apply casing  
10. Apply max-length (prefer word boundaries)  
11. Return a clean slug  

## Connect with HiMat Technology

- **Demo:** https://himat.tech/free-tools/slug-generator  
- **Facebook:** https://www.facebook.com/people/Himat-technology/61593829197445/  
- **LinkedIn:** https://www.linkedin.com/company/himat-technology  
- **Instagram:** https://www.instagram.com/himat_technology?igsi=djdmcGxweWtwYWI0  

## Open Source

This project is MIT-licensed. Configure the public repository link with `NEXT_PUBLIC_REPOSITORY_URL` — do not invent a URL.

## License

MIT — see [LICENSE](./LICENSE).

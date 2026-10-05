# Team Abhyuday Racing — website v2

A dynamic, mobile-first rebuild of the team website. It lives in `site-v2/` on the `redesign/v2` branch,
next to the current site (repo root), which is untouched.

One long page — **Home → Team → Achievements → Cars → Gallery → Partners → Support Us** — plus a page for every car at `/cars/<slug>/`.

## Stack

- Next.js 16 (App Router, TypeScript), static export (`output: "export"`) → plain files in `out/`
- Tailwind CSS 4 + design tokens in `src/app/globals.css`
- Motion (Framer Motion) for reveals, layout animations and page transitions
- GSAP + ScrollTrigger for scroll-scrubbed sequences (hero parallax, timeline line, pinned horizontal car gallery)
- Lenis smooth scrolling, driven by GSAP's ticker
- PhotoSwipe lightbox, `@google/model-viewer` for the A10 3D model — both load only on demand
- `sharp` build step that turns `media/originals/*` into responsive AVIF/WebP

All motion respects `prefers-reduced-motion` (no smooth scroll, pinning, parallax or preloader; simple fades only).

## Run it

```bash
cd site-v2
npm install
npm run dev        # http://localhost:3000
```

`dev` and `build` first run `npm run images` (photos → `public/photos/`, logo/icons/share image, placeholders).

## Build

```bash
npm run build      # static site in out/ (lint with: npm run lint)
npm start          # serves out/ at http://localhost:4173
```

## Check it

With `npm start` running in another terminal:

```bash
npm run shots                     # screenshots of every section at 390 px and 1440 px + a car page → screenshots/
node scripts/check-nav.mjs        # nav links, active state, URL hash, mobile menu, preloader, reduced motion
```

(First time only: `npx playwright install chromium`.)

## Deploy (as a separate preview — the live site is not affected)

**Vercel** (same host as the current site): create a **new** Vercel project from this repository and set

- Root Directory: `site-v2`
- Framework preset: Next.js (build command `npm run build`, output is detected automatically)
- Production branch: `redesign/v2` (or keep `main` as production and use the branch's preview URL)
- Optional env vars: `NEXT_PUBLIC_FORM_ENDPOINT`, `NEXT_PUBLIC_FORM_ACCESS_KEY` (see `.env.example`)

The existing Vercel project for the current site keeps building the repo root and is not changed.

**Any static host** (Netlify, Cloudflare Pages, GitHub Pages with a custom domain): run `npm run build` and upload `out/`.

After the first deploy, set `url` in `src/content/site.ts` to the real address so the sitemap and link previews are correct.

## Update the content

See **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)**. Everything editable is in `src/content/`.

- **[CONTENT_MAP.md](CONTENT_MAP.md)** — where every fact came from, and open questions
- **[ASSETS_NEEDED.md](ASSETS_NEEDED.md)** — every placeholder and where to drop the real file

## Folder layout

```
src/app/            layout, home page, cars/[slug] pages, sitemap, robots, manifest, 404
src/content/        all text and data (edit these)
src/components/     layout/ (nav, preloader, footer, cursor, providers)
                    sections/ (one file per home section)
                    cars/ (car page pieces) · ui/ (shared bits)
src/lib/            scroll, gsap, photos, lightbox helpers
media/originals/    full-size photos (source for the image build)
public/             partners/, models/, docs/, media/, placeholders/ (generated: photos/, brand/, og.jpg)
scripts/            build-images, fix-export (post-build), screenshots, check-nav
```

## Notes

- `scripts/fix-export.mjs` runs after every build. Next 16's static export writes prefetch files for `/cars/[slug]` in
  nested folders while the browser asks for flat file names; the script copies them so prefetching does not 404.
- Partner logos are trademarks of their owners (sources: `../public/partners/SOURCES.txt`).

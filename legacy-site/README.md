# Team Abhyuday Racing website

The website of Team Abhyuday Racing, the student motorsport team of G. H. Raisoni College of Engineering & Management, Pune. We build electric (eBAJA) and autonomous (aBAJA) off-road cars for BAJA SAEINDIA.

Built with Next.js as a static site: `npm run build` produces plain HTML, CSS and JS in `out/` that any host can serve.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

`dev` and `build` first run `npm run images`, which makes small AVIF and WebP copies of every photo in `media/originals/`.

## Update the content

Everything the team edits lives in `src/content/`. No design or code changes are needed.

| To change | Edit |
|---|---|
| Email, social links, recruitment form link, sponsor deck link | `src/content/site.ts` |
| Homepage text, 2026 timeline, "Coming up", "Latest", cars, season film | `src/content/home.ts` |
| Results table | `src/content/results.ts` |
| Season by season (official BAJA SAEINDIA dates and venues) | `src/content/seasons.ts` |
| Faculty, mentors, leads, squads, alumni | `src/content/team.ts` |
| Media page photos and films | `src/content/media.ts` |
| Partner logos | `src/content/partners.ts` and `public/partners/` |

Text in square brackets, like `[Name]` or `[Date to add]`, is a placeholder waiting for real information.

### Add a photo

1. Put the photo in `media/originals/` (JPG or PNG; 2000 to 2400 px on the long side is plenty). Use a short lowercase name such as `natrax-endurance-2026.jpg`.
2. Use that name without the extension wherever a content file asks for `photo`, for example in `src/content/media.ts`:
   ```ts
   { photo: "natrax-endurance-2026", title: "NATRAX endurance run", date: "11 January 2026", tag: "eBAJA" },
   ```
3. Run `npm run dev` to see it. An entry with an empty `photo` shows a dashed "Add a photo" slot instead.

### Add the season film

Upload it to YouTube, then paste the video ID (the part after `watch?v=`) into `film.youtubeId` in `src/content/home.ts` and `films` in `src/content/media.ts`.

### Update the 3D model

The viewer on the homepage loads `public/models/a10.glb` only when someone presses "Open the 3D model". To replace it with a new CAD export:

```bash
npm run model -- path/to/export.glb public/models/a10.glb
```

The script removes CAD edge lines, simplifies and compresses the mesh, and turns it upright. The current model went from 9.6 MB to 2.5 MB (about 0.9 MB when the server compresses it).

## Deploy

The site is fully static. Two free options:

- **Vercel**: import this repository at vercel.com/new. It detects Next.js and needs no settings.
- **Any static host** (Netlify, Cloudflare Pages, GitHub Pages with a custom domain): run `npm run build` and upload `out/`.

After deploying, set `url` in `src/content/site.ts` to the real address so link previews work.

## Speed

- The page is static HTML and shows before any JavaScript runs.
- Photos are served as AVIF (WebP fallback) at the width the screen needs. The hero is about 115 KB on a laptop and 55 KB on a phone.
- The 3D viewer library (about 1 MB) and the model download only on request.
- About 186 KB of JavaScript (compressed) loads after the page appears, mostly React and Next.js.

## Credits

See [CREDITS.md](CREDITS.md) for fonts, libraries, partner logos, photos and the 3D model.

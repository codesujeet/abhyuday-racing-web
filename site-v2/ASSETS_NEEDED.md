# Assets needed

Every placeholder on the site, and where to drop the real file. Photos dropped into `media/originals/` with the
exact name below replace the placeholder automatically on the next `npm run dev` / `npm run build` — no code changes.

## Photos

| ☐ | File to add | Shown in | Format | Placeholder now |
|---|---|---|---|---|
| ☐ | `media/originals/car-2025-abaja.jpg` | Cars section card + `/cars/abaja-2025/` hero | 16:10 landscape, JPG, ~2400×1500, car side or ¾ view | `public/placeholders/car-2025-abaja.svg` |
| ☐ | `media/originals/car-2024-ebaja.jpg` | Cars section card + `/cars/ebaja-2024/` hero | 16:10 landscape, JPG, ~2400×1500 | `public/placeholders/car-2024-ebaja.svg` |
| ☐ | `media/originals/car-2027-next.jpg` | Cars section "Next car" teaser (render or covered car) | 16:10, JPG, ~2400×1500 | `public/placeholders/car-2027-next.svg` |
| ☐ | `media/originals/natrax-endurance.jpg` | Gallery → eBAJA tab | 4:3, JPG, ~2000×1500 | `public/placeholders/natrax-endurance.svg` |
| ☐ | `media/originals/womens-endurance-2025.jpg` | Gallery → eBAJA tab | 4:3, JPG, ~2000×1500 | `public/placeholders/womens-endurance-2025.svg` |
| ☐ | `media/originals/news-coverage.jpg` | Gallery → Press tab | 4:3, JPG, ~2000×1500 | `public/placeholders/news-coverage.svg` |
| ☐ | Any team photos you prefer for the Team photo stack | Team section, left of the recruitment message. Put them in `media/originals/` and list them in `teamPhotos` in `src/content/team.ts` (top photo first) | 4:3 landscape, JPG, ~2000×1500 | Uses 3 real 2026 photos today |
| ☐ | Recruitment form link | "Join the team" button. Set `applyUrl` in `src/content/site.ts` — until then it jumps to the contact form | — | — |
| ☐ | Lead portraits, e.g. `media/originals/lead-captain.jpg` | Team cards. Add `photo: "lead-captain"` to the person in `src/content/team.ts` | 4:5 or square, JPG, ≥ 800 px | Initials monogram (`public/placeholders/portrait.svg` for reference) |
| ☐ | More A10 / 2025 / 2024 car photos | Car detail page galleries — add to the car's `gallery` in `src/content/cars.ts` | Any, JPG, 2000–2400 px | "Photos on their way" note |

## Video

| ☐ | File to add | Shown in | Format |
|---|---|---|---|
| ☐ | `public/media/hero.mp4` | Home hero background. Then set `heroVideo: "/media/hero.mp4"` in `src/content/site.ts` | 16:9, H.264 MP4, muted, 10–20 s seamless loop, ≤ 8 MB (placeholder spec card: `public/placeholders/hero-video.svg`) |
| ☐ | YouTube ID for "The Road to aBAJA 2026" | Gallery → Films. Paste into `films[0].youtubeId` in `src/content/gallery.ts` | Upload to the team channel |

## Documents

| ☐ | File | Shown in | Notes |
|---|---|---|---|
| ☐ | `public/docs/sponsorship-brochure.pdf` | Support Us → "Sponsorship brochure" button | Replace the one-page placeholder PDF with the real deck (same file name) |

## 3D models

| ☐ | File | Shown in | Notes |
|---|---|---|---|
| ✅ | `public/models/a10.glb` | `/cars/a10/` 3D viewer | Copied from the current site. Body panels and sensors not modelled yet. |
| ☐ | `public/models/abaja-2025.glb`, `public/models/ebaja-2024.glb` | Car page 3D viewer | Then set `model` on the car in `src/content/cars.ts` |

## Information (not files)

| ☐ | Item | Where it goes |
|---|---|---|
| ☐ | Lead names (8 roles) | `src/content/team.ts` → `leads` |
| ☐ | Sub-team of each squad member | `src/content/team.ts` → `squads[].members[].department` |
| ☐ | Sponsorship tier names and perks | `src/content/sponsorship.ts` → `tiers` (set `todo: false`) |
| ☐ | Partner tiers (title / technical / in-kind …) | `src/content/partners.ts` → `partnerTiers` + `tier` |
| ☐ | Phone number and postal address | `src/content/site.ts` → `phone`, `address` |
| ☐ | Car specs (weight, power, top speed, compute) | `src/content/cars.ts` (currently `"TBA"`) |
| ☐ | Confirm 72 V / 2WD for the 2024 eBAJA car | `src/content/cars.ts` |
| ☐ | Real site URL after deployment | `src/content/site.ts` → `url` (used by sitemap and link previews) |

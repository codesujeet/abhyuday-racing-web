# Content map

Where every fact on the v2 site comes from. Two source repositories:

- **`abhyuday-racing-web`** (this repo, `main`) — the current site. **Primary source.**
- **`baja`** (github.com/cipheroot6/baja) — an older prototype. Used only where it adds something that does not conflict.

Decisions agreed with the team before the build:

1. Where the repos disagree, `abhyuday-racing-web` wins.
2. **No scores** anywhere on the site — only awards and positions.
3. Accent colours from A10's livery (orange / cobalt / sky / lilac) on a carbon-black base.

## Brand

| Item | Value | Source |
|---|---|---|
| Logo / emblem | Orange sun + buggy, transparent PNG | `abhyuday-racing-web/media/originals/emblem.png` |
| Orange (primary accent) | `#EE7234` | A10 wrap orange, `abhyuday-racing-web/src/app/globals.css` (`--orange`) |
| Cobalt | `#2D5BB7` | A10 wrap blue (`--cobalt`) |
| Sky | `#47A3DC` | A10 wrap cyan (`--sky`) |
| Lilac | `#B88BE0` | A10 wrap stripe (`--lilac`) |
| Older orange | `#FF6B00` | `baja/src/app/globals.css` — not used |
| Tagline | "Rise. Conquer. Repeat." — confirmed by the team (both repos say "Arise", now corrected) | `abhyuday-racing-web/src/content/site.ts`, `baja/src/lib/site-config.ts` |
| Founded | 2023 | `baja/src/lib/site-config.ts` (`founded: 2023`); alumni batch "2023–24 Founding crew" in `abhyuday-racing-web/src/content/team.ts` |

## 1. Home (`src/content/home.ts`, `site.ts`, `stats.ts`)

| Content | Source |
|---|---|
| Team name, college, email, socials | `abhyuday-racing-web/src/content/site.ts` |
| Who we are (founded 2023, eBAJA 2024, aBAJA 2025, A10 wins 2026) | `site.ts`, `results.ts`, `home.ts` |
| What we do — aBAJA and eBAJA programme text | `abhyuday-racing-web/src/content/home.ts` → `programmes` |
| How the autonomy works (See → Recognise → Decide → Check → Act) | `home.ts` → `autonomySteps` |
| Where we compete (venues) | `abhyuday-racing-web/src/content/seasons.ts` (rounds marked `ours: true`) |
| Sub-team names | `abhyuday-racing-web/src/content/team.ts` → `departments` (5) |
| Sub-team descriptions ("The brain", Python/OpenCV/YOLO/ROS 2, Arduino/STM32/CAN …) | `baja/src/lib/content.ts` → `departments` |
| "No experience needed — we train you from zero" | `baja/src/lib/content.ts` → `faqs` |
| Counters | Calculated from the data files: seasons (3), cars built (3), categories (2), awards & podiums (5), members (25+, the aBAJA 2025 squad list) |

## 2. Team (`src/content/team.ts`)

| Content | Source |
|---|---|
| Faculty (5, incl. two Dronacharya awardees) | `abhyuday-racing-web/src/content/team.ts` → `faculty` |
| Mentors (3) | `team.ts` → `mentors` |
| Lead roles (8) — names are `[Name]` placeholders in the repo | `team.ts` → `leads` |
| aBAJA 2025 squad (25 names) | `team.ts` → `squads` |
| Banner photo | `media/originals/team-at-saeindia-gate.jpg` |

**Missing:** lead names and photos, member photos, each member's sub-team, LinkedIn links, a current-season group photo, past batches (alumni lists are empty in the repo).

## 3. Achievements (`src/content/achievements.ts`)

All from `abhyuday-racing-web/src/content/results.ts`, venues/dates from `seasons.ts`.

| Year | Result |
|---|---|
| 2026 | aBAJA finals, Chennai — Autonomous Emergency Braking **Winner**; Manufacturing Excellence **Winner**; MathWorks Advanced Simulation **First runner-up** |
| 2026 | aBAJA virtual round — **All India Rank 2** |
| 2026 | eBAJA, NATRAX — four-hour endurance race **Finished** |
| 2026 | Dronacharya Award — Dr. Asha Shendge |
| 2025 | aBAJA, GARC Chennai — **All India Rank 5** overall; Best Adaptive Cruise Control **Winner**; aBAJA debut |
| 2025 | eBAJA — women's endurance run, driver Sakshi Kute, **Second runner-up** |
| 2025 | Dronacharya Award — Dr. Arti Patle Yede |
| 2024 | eBAJA debut — first car unveiled 1 March 2024 |

## 4. Cars (`src/content/cars.ts`)

| Car | Source | Notes |
|---|---|---|
| **A10** (2026, aBAJA) | `home.ts` garage + season 2026 timeline + autonomy text; `results.ts`; photos in `media/originals`; 3D model `public/models/a10.glb` | Specs limited to what the repo states (camera + radar, ROS 2, Simulink, CarMaker, CAN, drive-by-wire). Weight, power, top speed, compute: **TBA**. |
| **aBAJA debut car** (2025) | `home.ts` garage, `results.ts` | No name, photo or specs in either repo. |
| **First eBAJA car** (2024) | `home.ts` garage, `results.ts` (unveiled 1 Mar 2024) | "72 V pack, 2WD" comes from `baja/src/lib/content.ts` (`trackContent.ebaja`), which describes the eBAJA platform in general — **please confirm it applies to the 2024 car.** |
| **Next car** (2027) | `home.ts` garage | Teaser only, no detail page. |

## 5. Gallery (`src/content/gallery.ts`) — new section

| Content | Source |
|---|---|
| 9 photos with titles, dates and tags | `abhyuday-racing-web/src/content/media.ts` + `media/originals/*.jpg` |
| 3 empty slots (NATRAX endurance, women's endurance 2025, news coverage) | `media.ts` (empty `photo`) |
| Season film "The Road to aBAJA 2026" | `media.ts` → `films` (no YouTube ID yet) |

## 6. Partners (`src/content/partners.ts`)

9 partners and logo files from `abhyuday-racing-web/src/content/partners.ts` and `public/partners/`. Homepage links use the domains listed in `public/partners/SOURCES.txt`.

**Missing:** partner tiers/categories (none in either repo — everyone is in one "Our Partners" group).

## 7. Support Us (`src/content/sponsorship.ts`)

| Content | Source |
|---|---|
| Why sponsor | Written from repo facts (BAJA SAEINDIA, tech stack, 2026 AEB win). "400+ teams" in `baja/src/lib/content.ts` was not used because it is not verified. |
| Tiers | **None in the repos — three `TODO` placeholder tiers**, flagged on the page as "Draft". |
| In-kind options | Generic categories matching what current partners provide |
| Brochure | Placeholder PDF at `public/docs/sponsorship-brochure.pdf` (`sponsorDeckUrl` is empty in the repo) |
| Contact | Email from `site.ts`. **Phone and postal address are not in either repo.** |

## Conflicts and items to confirm

| # | Topic | `abhyuday-racing-web` | Other | Shown on site |
|---|---|---|---|---|
| 1 | MathWorks Simulation 2026 | First runner-up | Brief said "1st Prize" | First runner-up |
| 2 | AEB at aBAJA 2025 | Not listed | Brief said "2nd place in AEB" | Not shown |
| 3 | eBAJA debut | 2024 (car unveiled 1 Mar 2024) | `baja` calls eBAJA 2026 "our debut national competition" | 2024 |
| 4 | Scores (eBAJA 2026 319.82, aBAJA 2026 285.40, HV safety 20/20 …) | — | `baja/src/lib/content.ts` | Not shown (no scores) |
| 5 | Departments | 5 (Autonomy, Drive-by-wire, Mechanical, Electrical, Documentation and sponsorship) | `baja` lists 6 (separate Sales & Sponsorship) | 5, with baja's descriptions |
| 6 | 72 V / 2WD | — | `baja` (eBAJA platform) | On the 2024 car — confirm |
| 7 | Which car raced eBAJA 2025 and 2026 | not stated | — | Results shown under Achievements only, not attached to a car |
| 8 | Site URL | `abhyuday-racing-web.vercel.app` | `teamabhyudayracing.vercel.app` (baja) | Set `site.url` once v2 is deployed |

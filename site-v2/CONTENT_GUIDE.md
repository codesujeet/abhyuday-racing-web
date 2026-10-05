# Content guide — updating the site without touching code

Everything visitors read lives in **`src/content/`**. Edit those files, run `npm run dev` to check, then commit.
You never need to edit anything in `src/components/` to change text, people, results, cars, photos or partners.

| To change | Edit |
|---|---|
| Email, phone, address, social links, hero video, brochure link | `src/content/site.ts` |
| Home: hero text, who we are, aBAJA/eBAJA blurbs, autonomy steps, where we compete, sub-teams | `src/content/home.ts` |
| Counters (seasons, cars, awards, members) | Worked out automatically — see `src/content/stats.ts` |
| Faculty, mentors, leads, squads, banner photo | `src/content/team.ts` |
| Results timeline | `src/content/achievements.ts` |
| Cars, spec sheets, car pages | `src/content/cars.ts` |
| Gallery photos, films | `src/content/gallery.ts` |
| Partner logos | `src/content/partners.ts` + logo file in `public/partners/` |
| Sponsorship tiers, perks, in-kind list | `src/content/sponsorship.ts` |

Text in square brackets, like `[Name]` or `[Date]`, is a placeholder waiting for real information.

## Photos

1. Put a JPG/PNG in `media/originals/` (2000–2400 px on the long side is plenty). Use a short lowercase name, e.g. `natrax-endurance.jpg`.
2. Use the name **without the extension** wherever a content file asks for `photo`:
   ```ts
   { photo: "natrax-endurance", title: "NATRAX endurance run", date: "11 January 2026", tag: "eBAJA", alt: "…" },
   ```
3. `npm run dev` / `npm run build` automatically make small AVIF + WebP copies.

If a file with that name does not exist yet, the matching placeholder in `public/placeholders/` is shown. The placeholders already listed in `ASSETS_NEEDED.md` are replaced **automatically** the moment you drop a photo with the same name into `media/originals/`.

Always write an `alt` text that describes the photo for people who cannot see it.

## Add a result

In `src/content/achievements.ts`, add to the right year (or add a new year at the top — newest first):

```ts
{ title: "Best Design", result: "Winner", kind: "win", headline: true },
```

`kind`: `"win"` (orange badge), `"place"` (blue outline — ranks, runner-up), `"plain"` (milestones). `headline: true` highlights the whole competition card.
The "awards & podiums" counter updates by itself.

## Add a car

Copy an entry in `src/content/cars.ts`, give it a new `slug` (it becomes `/cars/<slug>/`), set `built: true`, and fill in the specs.
Use `"TBA"` for numbers you have not confirmed — never guess. Put the newest car first and mark it `current: true` (and remove `current` from the old one) to make it the featured car.

3D model: export a `.glb`, put it in `public/models/`, and set `model: "/models/<file>.glb"`.
The old site's `npm run model` script (in the repo root) can shrink a CAD export first.

## Add a team member

```ts
{ name: "Full Name", role: "Autonomy Lead", department: "Autonomy", photo: "full-name", linkedin: "https://www.linkedin.com/in/…" },
```

`department` must match one of the names in `departments` (or `"Leadership"`) to appear under that filter tab.
For a new season, add a new object at the top of `squads` — a season selector appears automatically when there is more than one.

## Partners

Add the logo to `public/partners/` (SVG or a transparent PNG ~520 px wide) and an entry in `partners.ts`.
White-only logos need a `tile` colour (the brand's own background). To split partners into tiers, list tier names in `partnerTiers` and give each partner a `tier`.

## Sponsorship tiers

The tiers are placeholders (`todo: true`) because the repos had no tier structure. Replace names and perks and set `todo: false` — the "Draft" notice disappears when no tier is marked `todo`.

## Contact form

Without configuration the form opens the visitor's email app addressed to `site.email`.
To receive messages directly, create a free Formspree or Web3Forms form and set environment variables at build time (locally in `.env.local`, or in the host's settings):

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx   # or https://api.web3forms.com/submit
NEXT_PUBLIC_FORM_ACCESS_KEY=                               # Web3Forms only
```

## Hero video

Put a muted, looping MP4 (16:9, ≤ 8 MB) at `public/media/hero.mp4` and set `heroVideo: "/media/hero.mp4"` in `src/content/site.ts`.

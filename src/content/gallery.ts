// Photos and films for the home photo wall and the full gallery page (/gallery/).
// Source: abhyuday-racing-web/src/content/media.ts.
// `photo` = file name in media/originals without extension. If the file is missing,
// the placeholder of the same name in public/placeholders is shown (on the gallery page only).
// `tag` = the event the photo belongs to; it becomes a filter tab. Add new events to this list, newest first.
export const galleryTags = ["aBAJA 2026", "eBAJA 2026", "aBAJA 2025", "eBAJA 2025", "eBAJA 2024", "Press"] as const;
export type GalleryTag = (typeof galleryTags)[number];

export type GalleryItem = { photo: string; title: string; date: string; tag: GalleryTag; alt: string };

export const galleryItems: GalleryItem[] = [
  { photo: "team-at-saeindia-gate", title: "Arrival day in Chennai", date: "29 July 2026", tag: "aBAJA 2026", alt: "The team standing at the SAEINDIA gate on arrival day in Chennai" },
  { photo: "aeb-stop", title: "The emergency braking test", date: "2 August 2026", tag: "aBAJA 2026", alt: "A10 stopping for an obstacle in the emergency braking test" },
  { photo: "pit-bay", title: "A10 in the pit bay", date: "29 July 2026", tag: "aBAJA 2026", alt: "A10 parked in the team's pit bay" },
  { photo: "three-trophies", title: "Three trophies", date: "2 August 2026", tag: "aBAJA 2026", alt: "The three trophies won at aBAJA SAEINDIA 2026" },
  { photo: "champions-stage", title: "On the Champions stage", date: "2 August 2026", tag: "aBAJA 2026", alt: "The team on the Champions stage at aBAJA SAEINDIA 2026" },
  { photo: "valedictory", title: "Valedictory ceremony", date: "2 August 2026", tag: "aBAJA 2026", alt: "The valedictory ceremony at aBAJA SAEINDIA 2026" },
  { photo: "camera-bring-up", title: "Camera and compute bring-up", date: "27 June 2026", tag: "aBAJA 2026", alt: "Team members bringing up the camera and compute on A10" },
  { photo: "hil-testing", title: "Hardware-in-the-loop testing", date: "7 July 2026", tag: "aBAJA 2026", alt: "Hardware-in-the-loop test setup in the workshop" },
  { photo: "night-testing", title: "Night testing before transport", date: "25 July 2026", tag: "aBAJA 2026", alt: "A10 tested at night under floodlights" },
  { photo: "natrax-endurance", title: "NATRAX endurance run", date: "January 2026", tag: "eBAJA 2026", alt: "eBAJA endurance run at NATRAX (photo to come)" },
  { photo: "womens-endurance-2025", title: "Women's endurance run, 2025", date: "February 2025", tag: "eBAJA 2025", alt: "Women's endurance run at eBAJA 2025 (photo to come)" },
  { photo: "achievements-2025-1", title: "aBAJA debut at GARC Chennai", date: "October 2025", tag: "aBAJA 2025", alt: "Team Abhyuday Racing at aBAJA SAEINDIA 2025 (photo to come)" },
  { photo: "achievements-2024-1", title: "First car unveiled on campus", date: "1 March 2024", tag: "eBAJA 2024", alt: "The first eBAJA car unveiled on campus, 2024 (photo to come)" },
  { photo: "news-coverage", title: "News coverage", date: "[Date]", tag: "Press", alt: "Press coverage of the team (photo to come)" },
];

// Films and reels. Paste a YouTube video ID (the part after watch?v=) to make one playable.
export const films = [
  { title: "The Road to aBAJA 2026", detail: "Season film · 6 minutes", youtubeId: "", poster: "night-testing" },
  { title: "[Reel title]", detail: "Instagram reel", youtubeId: "", poster: "camera-bring-up" },
  { title: "[Next film]", detail: "Coming soon", youtubeId: "", poster: "champions-stage" },
];

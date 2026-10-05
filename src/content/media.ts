// Photos on the media page. `photo` is a file name in media/originals (without extension).
// Leave `photo` empty to show an empty slot that asks for a picture.
export const mediaTags = ["aBAJA 2026", "eBAJA", "Workshop", "Events", "Press"] as const;
export type MediaTag = (typeof mediaTags)[number];

export type MediaItem = { photo: string; title: string; date: string; tag: MediaTag };

export const mediaItems: MediaItem[] = [
  { photo: "team-at-saeindia-gate", title: "Arrival day in Chennai", date: "29 July 2026", tag: "aBAJA 2026" },
  { photo: "pit-bay", title: "A10 in the pit bay", date: "29 July 2026", tag: "aBAJA 2026" },
  { photo: "aeb-stop", title: "The emergency braking test", date: "2 August 2026", tag: "aBAJA 2026" },
  { photo: "three-trophies", title: "Three trophies", date: "2 August 2026", tag: "aBAJA 2026" },
  { photo: "champions-stage", title: "On the Champions stage", date: "2 August 2026", tag: "aBAJA 2026" },
  { photo: "valedictory", title: "Valedictory ceremony", date: "2 August 2026", tag: "Events" },
  { photo: "camera-bring-up", title: "Camera and compute bring-up", date: "27 June 2026", tag: "Workshop" },
  { photo: "hil-testing", title: "Hardware-in-the-loop testing", date: "7 July 2026", tag: "Workshop" },
  { photo: "night-testing", title: "Night testing before transport", date: "25 July 2026", tag: "Workshop" },
  { photo: "", title: "NATRAX endurance run", date: "[Date]", tag: "eBAJA" },
  { photo: "", title: "Women's endurance run, 2025", date: "[Date]", tag: "eBAJA" },
  { photo: "", title: "News coverage", date: "[Date]", tag: "Press" },
];

// Films and reels. Add a YouTube video ID to make one playable.
export const films = [
  { title: "The Road to aBAJA 2026", detail: "Season film, 6 minutes", youtubeId: "" },
  { title: "[Reel title]", detail: "Instagram reel", youtubeId: "" },
  { title: "[Next film]", detail: "Coming soon", youtubeId: "" },
];

// Results by year, newest first. Awards and positions only — no scores.
// Source: abhyuday-racing-web/src/content/results.ts (venues from seasons.ts).
//
// `kind`: "win" = winner/award (gold badge), "place" = podium or rank, "plain" = milestone.
// `headline: true` gives the result the big highlighted badge.
export type ResultKind = "win" | "place" | "plain";

export type Result = { title: string; result: string; kind: ResultKind; headline?: boolean };

export type Competition = { name: string; where: string; when?: string; results: Result[] };

export type Season = {
  year: number;
  summary: string;
  // Two photos shown beside the results. File names in media/originals, without extension.
  // Until a file exists, the placeholder of the same name in public/placeholders is shown.
  photos?: { photo: string; alt: string }[];
  competitions: Competition[];
};

export const achievements: Season[] = [
  {
    year: 2026,
    summary: "Three awards at the aBAJA finals with A10.",
    photos: [
      { photo: "three-trophies", alt: "The three trophies Team Abhyuday Racing won at aBAJA SAEINDIA 2026" },
      { photo: "champions-stage", alt: "The team on the Champions stage at aBAJA SAEINDIA 2026" },
    ],
    competitions: [
      {
        name: "aBAJA SAEINDIA 2026 — Finals",
        where: "Sri Sairam Engineering College, Chennai",
        when: "29 July – 2 August 2026",
        results: [
          { title: "Autonomous Emergency Braking", result: "Winner", kind: "win", headline: true },
          { title: "Manufacturing Excellence", result: "Winner", kind: "win", headline: true },
          { title: "MathWorks Advanced Simulation", result: "First runner-up", kind: "place" },
        ],
      },
      {
        name: "aBAJA SAEINDIA 2026 — Virtual round",
        where: "Virtual World Simulation event",
        when: "31 May 2026",
        results: [{ title: "Virtual round", result: "All India Rank 2", kind: "place" }],
      },
      {
        name: "eBAJA SAEINDIA 2026",
        where: "NATRAX, Pithampur",
        when: "January 2026",
        results: [{ title: "Four-hour endurance race", result: "Finished", kind: "plain" }],
      },
      {
        name: "Faculty honour",
        where: "GHRCEM Pune",
        results: [{ title: "Dronacharya Award — Dr. Asha Shendge", result: "Awarded", kind: "plain" }],
      },
    ],
  },
  {
    year: 2025,
    summary: "Autonomous debut: All India Rank 5 in our first aBAJA season.",
    photos: [
      { photo: "achievements-2025-1", alt: "Team Abhyuday Racing at aBAJA SAEINDIA 2025 (photo to come)" },
      { photo: "achievements-2025-2", alt: "Team Abhyuday Racing at eBAJA SAEINDIA 2025 (photo to come)" },
    ],
    competitions: [
      {
        name: "aBAJA SAEINDIA 2025",
        where: "Global Automotive Research Centre (GARC), Oragadam, Chennai",
        when: "9–12 October 2025",
        results: [
          { title: "Overall", result: "All India Rank 5", kind: "place", headline: true },
          { title: "Best Adaptive Cruise Control", result: "Winner", kind: "win", headline: true },
          { title: "First autonomous car of our own", result: "aBAJA debut", kind: "plain" },
        ],
      },
      {
        name: "eBAJA SAEINDIA 2025",
        where: "BV Raju Institute of Technology, Hyderabad",
        when: "February 2025",
        results: [{ title: "Women's endurance run — driver Sakshi Kute", result: "Second runner-up", kind: "place" }],
      },
      {
        name: "Faculty honour",
        where: "GHRCEM Pune",
        results: [{ title: "Dronacharya Award — Dr. Arti Patle Yede", result: "Awarded", kind: "plain" }],
      },
    ],
  },
  {
    year: 2024,
    summary: "Our first car of our own, unveiled on campus.",
    photos: [
      { photo: "achievements-2024-1", alt: "The first eBAJA car unveiled on campus, 2024 (photo to come)" },
      { photo: "achievements-2024-2", alt: "The 2024 team with the first eBAJA car (photo to come)" },
    ],
    competitions: [
      {
        name: "eBAJA SAEINDIA 2024",
        where: "GHRCEM Pune",
        when: "1 March 2024",
        results: [{ title: "First car of our own unveiled", result: "eBAJA debut", kind: "plain" }],
      },
    ],
  },
];

/** Every competition award or podium (winner / runner-up), used by the stat counters. Ranks and milestones are not counted. */
export const awardCount = achievements
  .flatMap((s) => s.competitions)
  .filter((c) => c.name !== "Faculty honour")
  .flatMap((c) => c.results)
  .filter((r) => r.kind === "win" || /runner-up/i.test(r.result)).length;

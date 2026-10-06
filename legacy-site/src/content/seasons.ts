// How each BAJA SAEINDIA season ran, from official SAEINDIA and host releases, plus our part in it.
// `ours: true` marks a round we entered. Square brackets mark facts still to be filled in.
export type Leg = { category: string; when: string; where: string; note?: string; ours?: boolean };
export type Phase = { name: string; what: string; legs: Leg[] };
export type Season = {
  year: string;
  title: string;
  intro: string;
  phases: Phase[];
  ours: string[];
  sources: { label: string; href: string }[];
};

export const seasons: Season[] = [
  {
    year: "2024",
    title: "BAJA SAEINDIA 2024, 17th edition",
    intro: "Theme: Multiverse of Mobility. Three rounds. The first season with hBAJA (CNG, moving to hydrogen) and aBAJA (autonomous).",
    phases: [
      {
        name: "Preliminary round",
        what: "Online design presentation to judges, then a rulebook quiz.",
        legs: [{ category: "All categories", when: "29–30 July 2023", where: "Online. Launch hosted by Ajeenkya D Y Patil University, Pune", ours: true }],
      },
      {
        name: "Virtual round",
        what: "Static events plus virtual dynamic events in IPG CarMaker.",
        legs: [{ category: "mBAJA, eBAJA, hBAJA", when: "1–3 December 2023", where: "Hosted by Chitkara University" }],
      },
      {
        name: "Physical round",
        what: "Static, safety, dynamic and four-hour endurance events on site.",
        legs: [
          { category: "mBAJA and hBAJA", when: "January 2024", where: "NATRAX, Pithampur, near Indore" },
          { category: "eBAJA", when: "March 2024", where: "BV Raju Institute of Technology, Narsapur, Hyderabad" },
          { category: "aBAJA, first edition", when: "4–6 October 2024", where: "ARAI, Kothrud, Pune", note: "Readiness checks 30 Sep to 3 Oct." },
        ],
      },
    ],
    ours: ["Our first eBAJA season.", "First car of our own unveiled on campus on 1 March 2024.", "[Add how far the 2024 car went]"],
    sources: [
      { label: "SAEINDIA press release, 28 Jul 2023", href: "https://bajasaeindia.org/upload/Pressrelease/Press%20Release%20Preliminary%20BAJA%20SAEINDIA%202024_1690821286.pdf" },
      { label: "Virtual round release, Dec 2023", href: "https://theprint.in/ani-press-releases/beyond-conventional-wheels-baja-saeindia-2024-initiates-virtual-round-at-chitkara-university/1867510/" },
      { label: "aBAJA 2024 release, 30 Sep 2024", href: "https://bajasaeindia.org/upload/Pressrelease/300924_PR_aBAJA_Ajeenkya_Pune_1728279200.pdf" },
    ],
  },
  {
    year: "2025",
    title: "BAJA SAEINDIA 2025, 18th edition",
    intro: "Three rounds across four categories. The preliminary round came to South India for the first time.",
    phases: [
      {
        name: "Preliminary round",
        what: "Online presentation to around 100 industry judges, then a quiz.",
        legs: [{ category: "All categories", when: "20–21 July 2024", where: "Hosted by Sri Sairam Engineering College, Chennai", ours: true }],
      },
      {
        name: "Virtual round",
        what: "Design, cost and sustainability judging plus a virtual dynamic event in simulation.",
        legs: [{ category: "mBAJA, eBAJA, hBAJA", when: "Nov – Dec 2024", where: "Hosted by Chitkara University, Punjab", ours: true }],
      },
      {
        name: "Physical round",
        what: "On-site static, safety, dynamic and endurance events.",
        legs: [
          { category: "mBAJA and hBAJA", when: "9–12 January 2025", where: "NATRAX, Pithampur", note: "HR meet 13–14 January." },
          { category: "eBAJA", when: "20–23 February 2025", where: "BV Raju Institute of Technology, Narsapur, Hyderabad", ours: true },
          { category: "aBAJA, second edition", when: "9–12 October 2025", where: "Global Automotive Research Centre (GARC), Oragadam, Chennai", note: "17 teams registered.", ours: true },
        ],
      },
    ],
    ours: ["eBAJA: second runner-up in the women’s endurance run, driven by Sakshi Kute.", "aBAJA debut: All India Rank 5 and Best Adaptive Cruise Control."],
    sources: [
      { label: "SAEINDIA press release, 19 Jul 2024", href: "https://bajasaeindia.org/upload/Pressrelease/BSI25_Press%20Release_Sairam_190724%20V2_1721829277.pdf" },
      { label: "Physical round, Autocar Professional", href: "https://www.autocarpro.in/news/baja-saeindia-2025-physical-round-set-to-showcase-sustainable-motility-at-natrax-pithampur-124252" },
      { label: "Virtual round release", href: "https://theprint.in/ani-press-releases/shaping-the-future-of-mobility-baja-saeindia-2025-virtual-round-for-vehicle-design-commences-at-chitkara-university-chandigarh/2380470/" },
      { label: "aBAJA 2025 report, Autocar Professional", href: "https://www.autocarpro.in/news/ips-academy-indore-wins-inaugural-abaja-saeindia-2025-championship-129267" },
    ],
  },
  {
    year: "2026",
    title: "BAJA SAEINDIA 2026, 19th edition",
    intro: "Theme: Torque to Triumph. eBAJA drew 90 electric teams and hBAJA 21 hydrogen-hybrid teams. aBAJA ran its own three-round calendar.",
    phases: [
      {
        name: "Preliminary round",
        what: "Design presentation and quiz.",
        legs: [
          { category: "aBAJA", when: "January 2026", where: "Online (official plan)", ours: true },
          { category: "mBAJA, eBAJA, hBAJA", when: "[Date to add]", where: "[Host to add]" },
        ],
      },
      {
        name: "Virtual round",
        what: "Simulation-based dynamic events and static judging.",
        legs: [
          { category: "aBAJA", when: "31 May 2026", where: "Virtual World Simulation event", note: "The official plan said March 2026.", ours: true },
          { category: "aBAJA", when: "8 June 2026", where: "Drive-by-wire evaluation", ours: true },
        ],
      },
      {
        name: "Physical round",
        what: "Five days on site, ending with the endurance run.",
        legs: [
          { category: "eBAJA and hBAJA", when: "7–11 January 2026", where: "NATRAX, Pithampur", note: "Four-hour endurance on 11 January. HR meet 12–13 January at Acropolis Institute, Indore.", ours: true },
          { category: "mBAJA", when: "February 2026", where: "BV Raju Institute of Technology, Narsapur" },
          { category: "aBAJA, third edition", when: "29 July – 2 August 2026", where: "Sri Sairam Engineering College, Chennai", note: "The official plan said June 2026.", ours: true },
        ],
      },
    ],
    ours: [
      "eBAJA: finished the four-hour endurance race at NATRAX.",
      "aBAJA: winner in Autonomous Emergency Braking (100/100) and Manufacturing Excellence, first runner-up in MathWorks Advanced Simulation, All India Rank 2 in the virtual round.",
    ],
    sources: [
      { label: "aBAJA 2026 registration guidelines", href: "https://www.bajasaeindia.org/download/aBAJA%20SAEINDIA%202026%20Registration%20Guidelines_1761834609.pdf" },
      { label: "eBAJA 2026 at NATRAX, Autocar Professional", href: "https://www.autocarpro.in/news/baja-saeindia-2026-begins-19th-edition-with-electric-and-hydrogen-hybrid-competitions-at-natrax-130512" },
      { label: "aBAJA 2026 physical round, Sairam", href: "https://sairam.edu.in/baja-saeindia-2026-physical-round-phase-iii/" },
      { label: "mBAJA 2026 venue, BAJA SAEINDIA news", href: "https://bajasaeindia.org/news" },
    ],
  },
  {
    year: "2027",
    title: "BAJA SAEINDIA 2027",
    intro: "Back to the pre-COVID format: two rounds instead of three, for mBAJA, eBAJA, hBAJA and aBAJA. Dates and venues have not been announced yet.",
    phases: [
      {
        name: "Virtual round",
        what: "Preliminary design presented to judges with a build plan, then a quiz on engineering, sustainability and the rulebook.",
        legs: [{ category: "All categories", when: "Not announced", where: "Online", ours: true }],
      },
      {
        name: "Physical round",
        what: "Five days. Static events (design, sales, cost, innovation, sustainability, CAE). Safety checks (technical inspection, brake test, rain test for eBAJA). Dynamic events (acceleration, sled pull, manoeuvrability, suspension and traction). Four-hour endurance.",
        legs: [
          { category: "All categories", when: "Not announced", where: "Venues to be announced", ours: true },
          { category: "HR meet", when: "After the competition", where: "Two days for final-year students who clear the BAJA Aptitude Test" },
        ],
      },
    ],
    ours: ["[Which categories we enter in 2027]", "[Our goal for the season]"],
    sources: [{ label: "BAJA SAEINDIA official site", href: "https://bajasaeindia.org/" }],
  },
];

// The season shown first in the "Season by season" tabs.
export const defaultSeason = "2026";

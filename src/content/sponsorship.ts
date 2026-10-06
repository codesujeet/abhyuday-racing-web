// Support Us section.
// The repos contain NO sponsorship tier structure, so the tiers below are TODO placeholders.
// Replace names, perks and set `todo: false` once the team confirms them.

export const whySponsor = [
  {
    title: "National reach",
    body: "Your brand travels with us to BAJA SAEINDIA — the national off-road series that draws student teams from across India — and to our Instagram, LinkedIn and YouTube audiences.",
  },
  {
    title: "Visibility on track",
    body: "Logos on the car, team kit and pit bay, in front of judges, industry professionals and media at every event.",
  },
  {
    title: "Talent pipeline",
    body: "Meet engineers who have shipped ROS 2 autonomy, CAN drive-by-wire, MATLAB Simulink and IPG CarMaker models and a race-ready chassis before they graduate.",
  },
  {
    title: "Autonomous-vehicle R&D",
    body: "Associate your name with a team that won Autonomous Emergency Braking at aBAJA SAEINDIA 2026 — real perception, planning and control on a real vehicle.",
  },
];

export type Tier = { name: string; todo: boolean; highlight?: boolean; perks: string[] };

export const tiers: Tier[] = [
  {
    name: "[Tier 1 — e.g. Title Partner]",
    todo: true,
    highlight: true,
    perks: ["[Perk — e.g. naming on the car]", "[Perk — largest logo on livery]", "[Perk — team visit and demo day]", "[Perk — recruitment access]"],
  },
  {
    name: "[Tier 2 — e.g. Gold Partner]",
    todo: true,
    perks: ["[Perk — logo on car sides]", "[Perk — logo on team kit]", "[Perk — social media features]"],
  },
  {
    name: "[Tier 3 — e.g. Silver Partner]",
    todo: true,
    perks: ["[Perk — logo on website]", "[Perk — thank-you post]"],
  },
];

export const inKind = [
  { title: "Software & licences", body: "Simulation, CAD, CAE and toolchains." },
  { title: "Sensors & compute", body: "Cameras, radar, embedded boards and onboard computers." },
  { title: "Components & materials", body: "Tubing, fasteners, suspension, tyres, batteries and electronics." },
  { title: "Manufacturing", body: "Machining, welding, fabrication and test facilities." },
  { title: "Travel & logistics", body: "Transport for the car and the team to competitions." },
];

export const supportCopy = {
  title: "Fuel the next lap",
  lede: "We are students building an autonomous race car on a college budget. Your support turns late nights in the workshop into results on the national stage.",
  formTitle: "Talk to us",
  formNote: "Send us a note and the sponsorship team will get back to you.",
};

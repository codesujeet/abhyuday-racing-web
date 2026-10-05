// Partner logos live in public/partners (where each file came from: abhyuday-racing-web/public/partners/SOURCES.txt).
// `tile` = background colour for logos that only come in white, matching the brand's own site.
// `href` = partner homepage (domain from SOURCES.txt).
// The repos list no tiers, so everyone sits in one group. To split them, give each a `tier` from `partnerTiers`.
export type Partner = { name: string; logo: string; href: string; tile?: string; small?: boolean; tier?: string };

export const partnerTiers = ["Our Partners"];

export const partners: Partner[] = [
  { name: "IPG Automotive", logo: "/partners/ipg_automotive.svg", href: "https://www.ipg-automotive.com" },
  { name: "MathWorks", logo: "/partners/mathworks.png", href: "https://www.mathworks.com" },
  { name: "Vector Informatik", logo: "/partners/vector_informatik_white.svg", href: "https://www.vector.com", tile: "#B70032" },
  { name: "Kvaser", logo: "/partners/kvaser.svg", href: "https://kvaser.com" },
  { name: "Ansys", logo: "/partners/ansys_black.png", href: "https://www.ansys.com" },
  { name: "SOLIDWORKS", logo: "/partners/solidworks.svg", href: "https://www.solidworks.com" },
  { name: "Belrise Industries", logo: "/partners/belrise_industries.png", href: "https://belriseindustries.com" },
  { name: "Automotive Test Systems", logo: "/partners/automotive_test_systems_85px.png", href: "http://www.ats-india.net", small: true },
  { name: "TRACO POWER", logo: "/partners/traco_power_white.svg", href: "https://www.tracopower.com", tile: "#00283C" },
];

export const partnersThanks =
  "Every result on this site was made possible by the software, tools, components and support of our partners. Thank you.";

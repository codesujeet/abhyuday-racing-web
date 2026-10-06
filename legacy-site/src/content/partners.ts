// Partner logos live in public/partners. Where each file came from is listed in public/partners/SOURCES.txt.
// `tile` is a background colour for logos that only come in white, matching the brand's own site.
export type Partner = { name: string; logo: string; tile?: string; small?: boolean };

export const partners: Partner[] = [
  { name: "IPG Automotive", logo: "/partners/ipg_automotive.svg" },
  { name: "MathWorks", logo: "/partners/mathworks.png" },
  { name: "Vector Informatik", logo: "/partners/vector_informatik_white.svg", tile: "#B70032" },
  { name: "Kvaser", logo: "/partners/kvaser.svg" },
  { name: "Ansys", logo: "/partners/ansys_black.png" },
  { name: "SOLIDWORKS", logo: "/partners/solidworks.svg" },
  { name: "Belrise Industries", logo: "/partners/belrise_industries.png" },
  { name: "Automotive Test Systems", logo: "/partners/automotive_test_systems_85px.png", small: true },
  { name: "TRACO POWER", logo: "/partners/traco_power_white.svg", tile: "#00283C" },
];

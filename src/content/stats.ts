// Animated counters on the Home section. Numbers are worked out from the other content files,
// so they stay correct when you add a car, a result or a squad.
import { achievements, awardCount } from "./achievements";
import { builtCars } from "./cars";
import { squads } from "./team";

export const stats = [
  { value: achievements.length, suffix: "", label: "Seasons raced", hud: "SEASONS" },
  { value: builtCars.length, suffix: "", label: "Cars built", hud: "CARS" },
  { value: 2, suffix: "", label: "Categories — aBAJA & eBAJA", hud: "CLASSES" },
  { value: awardCount, suffix: "", label: "National awards & podiums", hud: "AWARDS" },
  { value: Math.max(...squads.map((s) => s.members.length)), suffix: "+", label: "Members", hud: "CREW" },
];

// Every result since our debut. Newest first. `kind` sets the colour of the result chip.
export type ResultKind = "win" | "place" | "plain";

export type Result = {
  year: number;
  event: string;
  category: string;
  result: string;
  kind: ResultKind;
};

export const results: Result[] = [
  { year: 2026, event: "aBAJA, Chennai", category: "Autonomous Emergency Braking (100/100)", result: "Winner", kind: "win" },
  { year: 2026, event: "aBAJA, Chennai", category: "Manufacturing Excellence", result: "Winner", kind: "win" },
  { year: 2026, event: "aBAJA, Chennai", category: "MathWorks Advanced Simulation", result: "First runner-up", kind: "place" },
  { year: 2026, event: "aBAJA, virtual", category: "Virtual World Simulation round", result: "All India Rank 2", kind: "place" },
  { year: 2026, event: "eBAJA, NATRAX Pithampur", category: "Four-hour endurance race", result: "Finished", kind: "plain" },
  { year: 2026, event: "Faculty award", category: "Dronacharya Award, Dr. Asha Shendge", result: "Awarded", kind: "plain" },
  { year: 2025, event: "aBAJA, GARC Chennai", category: "Overall, debut season", result: "All India Rank 5", kind: "place" },
  { year: 2025, event: "aBAJA, GARC Chennai", category: "Best Adaptive Cruise Control", result: "Winner", kind: "win" },
  { year: 2025, event: "eBAJA", category: "Women's endurance run, driver Sakshi Kute", result: "Second runner-up", kind: "place" },
  { year: 2025, event: "Faculty award", category: "Dronacharya Award, Dr. Arti Patle Yede", result: "Awarded", kind: "plain" },
  { year: 2024, event: "eBAJA", category: "First car of our own, unveiled 1 March 2024", result: "Debut", kind: "plain" },
];

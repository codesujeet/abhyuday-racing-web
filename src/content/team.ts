// People. Source: abhyuday-racing-web/src/content/team.ts.
// `photo` = file name in media/originals without extension. Empty = initials placeholder.
// `department` must be one of `departments` below (or "Leadership") for the filter tabs to pick it up.
// `linkedin` is optional.

export const departments = ["Autonomy", "Drive-by-wire", "Mechanical", "Electrical", "Documentation and sponsorship"];

export type Person = { name: string; role: string; department?: string; photo?: string; linkedin?: string; honour?: string };

// Photo stack beside the recruitment message (top photo first). File names in media/originals.
export const teamPhotos = [
  { photo: "team-at-saeindia-gate", alt: "The team at the SAEINDIA gate on arrival day in Chennai, 2026", label: "aBAJA 2026 · Chennai" },
  { photo: "champions-stage", alt: "The team on the Champions stage at aBAJA SAEINDIA 2026", label: "Champions stage" },
  { photo: "valedictory", alt: "The team at the aBAJA SAEINDIA 2026 valedictory ceremony", label: "Valedictory 2026" },
];

// Recruitment block. The button uses site.applyUrl when set, otherwise it jumps to the contact form.
export const recruitment = {
  kicker: "Recruitment 2026–27 · Applications open",
  title: "Build the car that drives itself.",
  body: "No experience needed — we train you from zero. Coders, designers, welders, wire-wranglers and storytellers from every branch: if you would rather build a race car than read about one, there is a seat for you in the workshop.",
  points: ["Design, build and race a real off-road car", "Learn ROS 2, CAN, CAD and simulation hands-on", "Compete on the national stage at BAJA SAEINDIA"],
  cta: "Join the team",
};

export const faculty: Person[] = [
  { name: "Dr. Ravindra Kharadkar", role: "Campus Director" },
  { name: "Dr. Nagnath Hulle", role: "I/C Director" },
  { name: "Dr. Deepika Ajalkar", role: "Head of Department" },
  { name: "Dr. Asha Shendge", role: "Faculty Advisor", honour: "Dronacharya Award 2026" },
  { name: "Dr. Arti Patle Yede", role: "Faculty Advisor", honour: "Dronacharya Award 2025" },
];

export const mentors: Person[] = [
  { name: "Vasanth Krishnan Abiraman", role: "Mentor" },
  { name: "Afaque Hawa", role: "Mentor" },
  { name: "Munish Raj", role: "Mentor" },
];

// Current leads, in display order. TODO: replace "[Name]" and add photos (media/originals/<photo>.jpg).
export const leads: Person[] = [
  { name: "[Name]", role: "Captain" },
  { name: "[Name]", role: "Vice Captain" },
  { name: "[Name]", role: "Team Manager" },
  { name: "[Name]", role: "Mechanical Head" },
  { name: "[Name]", role: "Drive-by-Wire Head" },
  { name: "[Name]", role: "Software Head" },
  { name: "[Name]", role: "Driver" },
  { name: "[Name]", role: "Co-Driver" },
];

// Full team by season, newest first — shown under "Explore the full team". A season selector appears when there is more than one.
export const squads: { season: string; note: string; members: Person[] }[] = [
  {
    season: "aBAJA 2025",
    note: "Names from the team's aBAJA 2025 post.",
    members: [
      "Sakshi Kute", "Riddhi Lohiya", "Soham Gandhi", "Mohit Thigale", "Vignesh Pidugu", "Shubham Ghavat", "Karan Ambhore",
      "Anshun Pardhi", "Aditya Ithape", "Saif Shikalgar", "Shubham Sahu", "Naman Kadam", "Sahil Kewat", "Kalpesh Chaudhari",
      "Kushal Dakhore", "Dhruv Pal", "Kartik Bhat", "Harshal Chopda", "Harsh Mehetre", "Kshitij Kolekar", "Irfan Pathan",
      "Tanishka Patil", "Raginee Pawal", "Sujeet Yadav", "Shivam Bhujbal",
    ].map((name) => ({ name, role: "Team member" })),
  },
];

// People. Source: abhyuday-racing-web/src/content/team.ts.
// `photo` = file name in media/originals without extension. Empty = initials placeholder.
// `department` must be one of `departments` below (or "Leadership") for the filter tabs to pick it up.
// `linkedin` is optional.

export const departments = ["Autonomy", "Drive-by-wire", "Mechanical", "Electrical", "Documentation and sponsorship"];

export type Person = { name: string; role: string; department?: string; photo?: string; linkedin?: string; honour?: string };

// Banner photo. Swap to "team-group" once media/originals/team-group.jpg (current season group photo) exists.
export const groupPhoto = { photo: "team-at-saeindia-gate", alt: "Team Abhyuday Racing at the SAEINDIA gate on arrival day in Chennai, 2026", label: "aBAJA 2026 · Chennai" };

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

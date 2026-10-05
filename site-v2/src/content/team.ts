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

// Current leads. TODO: replace "[Name]" and add photos.
export const leads: Person[] = [
  { name: "[Name]", role: "Team Captain", department: "Leadership" },
  { name: "[Name]", role: "Vice Captain", department: "Leadership" },
  { name: "[Name]", role: "Autonomy Lead", department: "Autonomy" },
  { name: "[Name]", role: "Drive-by-Wire Lead", department: "Drive-by-wire" },
  { name: "[Name]", role: "Mechanical Lead", department: "Mechanical" },
  { name: "[Name]", role: "Electrical Lead", department: "Electrical" },
  { name: "[Name]", role: "Documentation Lead", department: "Documentation and sponsorship" },
  { name: "[Name]", role: "Sponsorship Lead", department: "Documentation and sponsorship" },
];

// Squads by season, newest first. A year selector appears when there is more than one.
// Add `department` to each member when known so they show up under the filter tabs.
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

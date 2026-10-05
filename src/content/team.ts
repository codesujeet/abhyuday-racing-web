// People on the team page. Add a `photo` (file name in media/originals, no extension) to show a portrait.

export const faculty = [
  { name: "Dr. Ravindra Kharadkar", role: "Campus Director" },
  { name: "Dr. Nagnath Hulle", role: "I/C Director" },
  { name: "Dr. Deepika Ajalkar", role: "Head of Department" },
  { name: "Dr. Asha Shendge", role: "Faculty Advisor", honour: "Dronacharya Award 2026" },
  { name: "Dr. Arti Patle Yede", role: "Faculty Advisor", honour: "Dronacharya Award 2025" },
];

export const mentors = ["Vasanth Krishnan Abiraman", "Afaque Hawa", "Munish Raj"];

// Current leads. Replace "[Name]" and add a photo when ready.
export const leads = [
  { name: "[Name]", role: "Team Captain", photo: "" },
  { name: "[Name]", role: "Vice Captain", photo: "" },
  { name: "[Name]", role: "Autonomy Lead", photo: "" },
  { name: "[Name]", role: "Drive-by-Wire Lead", photo: "" },
  { name: "[Name]", role: "Mechanical Lead", photo: "" },
  { name: "[Name]", role: "Electrical Lead", photo: "" },
  { name: "[Name]", role: "Documentation Lead", photo: "" },
  { name: "[Name]", role: "Sponsorship Lead", photo: "" },
];

export const departments = ["Autonomy", "Drive-by-wire", "Mechanical", "Electrical", "Documentation and sponsorship"];

// Squad lists by season. Add `department` to each person when known.
export const squads = [
  {
    season: "aBAJA 2025",
    note: "Names from the team's aBAJA 2025 post.",
    members: [
      "Sakshi Kute", "Riddhi Lohiya", "Soham Gandhi", "Mohit Thigale", "Vignesh Pidugu", "Shubham Ghavat", "Karan Ambhore",
      "Anshun Pardhi", "Aditya Ithape", "Saif Shikalgar", "Shubham Sahu", "Naman Kadam", "Sahil Kewat", "Kalpesh Chaudhari",
      "Kushal Dakhore", "Dhruv Pal", "Kartik Bhat", "Harshal Chopda", "Harsh Mehetre", "Kshitij Kolekar", "Irfan Pathan",
      "Tanishka Patil", "Raginee Pawal", "Sujeet Yadav", "Shivam Bhujbal",
    ].map((name) => ({ name, department: "" })),
  },
];

// Past crews. Add names and a group photo for each batch.
export const alumni = [
  { batch: "2023–24", label: "Founding crew", names: [] as string[], photo: "" },
  { batch: "2024–25", label: "eBAJA debut", names: [] as string[], photo: "" },
  { batch: "2025–26", label: "aBAJA debut, All India Rank 5", names: [] as string[], photo: "" },
];

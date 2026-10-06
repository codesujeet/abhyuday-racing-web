// Homepage copy that changes from season to season.

export const proof =
  "At aBAJA SAEINDIA 2026 in Chennai, A10 won Autonomous Emergency Braking with a perfect 100, won Manufacturing Excellence, and finished first runner-up in MathWorks Advanced Simulation.";

export const programmes = [
  {
    id: "abaja",
    name: "aBAJA",
    what: "A buggy that drives itself. A camera and radar see the course, software decides what to do, and motors work the throttle, brake and steering.",
    specs: [
      { term: "Since", detail: "2025" },
      { term: "It can", detail: "Brake for obstacles, follow a car at a safe gap, keep its lane, read signs and lights" },
      { term: "Built with", detail: "ROS 2, MATLAB Simulink, IPG CarMaker, CAN" },
    ],
    link: { label: "How the autonomy works", href: "/#aeb" },
  },
  {
    id: "ebaja",
    name: "eBAJA",
    what: "An electric off-roader with a driver, built to last a four-hour endurance race over rough ground.",
    specs: [
      { term: "Since", detail: "2024" },
      { term: "Inside", detail: "Electric motor and controller, battery pack with management system, high-voltage safety" },
      { term: "Built", detail: "Chassis designed, welded and assembled in our workshop" },
    ],
    link: { label: "See eBAJA results", href: "/#results" },
  },
];

// The autonomy sequence under the braking photo. It is a real order of operations, so it is numbered.
export const autonomySteps = [
  { title: "See", body: "The camera and radar watch the lane ahead." },
  { title: "Recognise", body: "Software picks out lanes, obstacles, signs and lights." },
  { title: "Decide", body: "Braking, following and lane-keeping logic chooses what to do." },
  { title: "Check", body: "Each command is compared with what the car actually did, and corrected." },
  { title: "Act", body: "Motors move the throttle, brake and steering." },
];

// Season 2026 course line. `result: true` puts the stop in orange.
export const season2026 = {
  heading: "Six months from first simulation to the podium",
  lede: "Budget approval pushed the build back to late May, so a core crew of five or six lived in the workshop through the summer.",
  stops: [
    { when: "Mid April", title: "Simulation starts", body: "Control logic built in MATLAB Simulink and IPG CarMaker." },
    { when: "Late May", title: "Build starts", body: "Budget approved and work moves to the workshop." },
    { when: "31 May", title: "Virtual round", body: "All India Rank 2.", result: true },
    { when: "8 June", title: "Drive-by-wire check", body: "Judges evaluate the actuation system." },
    { when: "June to July", title: "Living in the workshop", body: "Wiring, mounts, software and night testing under floodlights." },
    { when: "25 July", title: "Loaded up", body: "A10 leaves Pune for Chennai." },
    { when: "29 Jul to 2 Aug", title: "Finals", body: "Three awards at Sri Sairam Engineering College.", result: true },
  ],
  awards: [
    { rank: "Winner", title: "Autonomous Emergency Braking", body: "Full marks, 100 out of 100.", win: true },
    { rank: "Winner", title: "Manufacturing Excellence", body: "For how A10 was designed and built.", win: true },
    { rank: "First runner-up", title: "MathWorks Advanced Simulation", body: "For testing in simulation before the track.", win: false },
  ],
};

// "Coming up" list. Leave `when` empty for dates not set yet.
export const upcoming = [
  { when: "October 2026", title: "Recruitment for 2026–27", detail: "", status: "Applications open", open: true },
  { when: "", title: "BAJA SAEINDIA 2027, virtual round", detail: "Design presentation and quiz. 2027 goes back to two rounds for all four categories.", status: "Dates not announced yet", open: false },
  { when: "", title: "BAJA SAEINDIA 2027, physical round", detail: "Five days of static, safety, dynamic and four-hour endurance events.", status: "Venues and dates not announced yet", open: false },
  { when: "", title: "[Workshop or campus event]", detail: "", status: "Add the event here", open: false },
];

// "Latest" list. Newest first. `draft: true` shows a dashed placeholder row.
export const news = [
  { date: "2 August 2026", title: "Three awards at aBAJA SAEINDIA 2026", body: "Emergency braking winner, Manufacturing Excellence, and a simulation podium.", href: "/#season" },
  { date: "August 2026", title: "The Road to aBAJA 2026, our season film", body: "Six minutes from the workshop to the finals.", href: "/#film" },
  { date: "[Date]", title: "[Your next update]", body: "Each update is a date, a title and two lines in src/content/home.ts.", href: "", draft: true },
];

// Cars, oldest first. `photo` is a file name from media/originals (without extension), or empty for a slot.
export const garage = [
  { year: "2024", name: "First eBAJA car", body: "Our first electric off-roader, unveiled on campus.", photo: "", slot: "Add a photo of the 2024 car" },
  { year: "2025", name: "aBAJA debut car", body: "First autonomous entry. All India Rank 5 and Best Adaptive Cruise Control.", photo: "", slot: "Add a photo of the 2025 car" },
  { year: "2026", name: "A10", body: "Emergency braking winner and Manufacturing Excellence winner.", photo: "hero-a10-aeb-run", slot: "", current: true },
  { year: "2027", name: "Next car", body: "Reveal date to be announced.", photo: "", slot: "In design now. We’ll show it here first." },
];

// Season film. Paste the YouTube video ID (the part after watch?v=) once it is uploaded.
export const film = {
  title: "The Road to aBAJA 2026",
  body: "Our six-minute season film: simulation, the summer in the workshop, night testing and the finals in Chennai.",
  youtubeId: "",
  poster: "night-testing",
};

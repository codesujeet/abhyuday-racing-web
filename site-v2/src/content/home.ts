// Copy for the Home section: hero, who we are, what we do, where we compete, sub-teams.
// Sources: abhyuday-racing-web/src/content/home.ts + seasons.ts, baja/src/lib/content.ts (departments).

export const hero = {
  kicker: "Autonomous & electric off-road racing · GHRCEM Pune",
  // Hero headline, one string per line. The second word is drawn in orange.
  headline: ["Rise, Conquer,", "Repeat"],
  lede: "We are the student motorsport team of G. H. Raisoni College of Engineering & Management, Pune — designing, building and racing a buggy that drives itself.",
  ctas: [
    { label: "Meet the Cars", href: "#cars" },
    { label: "Support Us", href: "#support" },
  ],
};

export const about = {
  title: "Who we are",
  body: [
    "Team Abhyuday Racing was founded in 2023 at G. H. Raisoni College of Engineering & Management, Pune. Students from every branch design, build and race off-road cars for BAJA SAEINDIA.",
    "We started with an electric car in 2024 and made our autonomous debut in 2025. In 2026 our car A10 won Autonomous Emergency Braking and Manufacturing Excellence at aBAJA SAEINDIA in Chennai.",
  ],
};

// What we do. Two programmes.
export const programmes = [
  {
    id: "abaja",
    name: "aBAJA",
    full: "Autonomous",
    since: "2025",
    what: "A buggy that drives itself. A camera and radar see the course, software decides what to do, and motors work the throttle, brake and steering.",
    points: [
      "Brakes for obstacles, follows a car at a safe gap, keeps its lane, reads signs and lights",
      "Built with ROS 2, MATLAB Simulink, IPG CarMaker and CAN",
      "Drive-by-wire throttle, brake and steering",
    ],
  },
  {
    id: "ebaja",
    name: "eBAJA",
    full: "Electric",
    since: "2024",
    what: "An electric off-roader with a driver, built to last a four-hour endurance race over rough ground.",
    points: [
      "Electric motor and controller, battery pack with management system",
      "High-voltage safety systems",
      "Chassis designed, welded and assembled in our workshop",
    ],
  },
];

// How the autonomy works. A real order of operations.
export const autonomySteps = [
  { title: "See", body: "The camera and radar watch the lane ahead." },
  { title: "Recognise", body: "Software picks out lanes, obstacles, signs and lights." },
  { title: "Decide", body: "Braking, following and lane-keeping logic chooses what to do." },
  { title: "Check", body: "Each command is compared with what the car actually did, and corrected." },
  { title: "Act", body: "Motors move the throttle, brake and steering." },
];

// Where we compete. From the official BAJA SAEINDIA calendars in abhyuday-racing-web/src/content/seasons.ts.
export const competitions = {
  title: "Where we compete",
  body: "BAJA SAEINDIA is India's national off-road vehicle design series, run by SAEINDIA. Teams go through virtual and physical rounds: design presentations, simulation, technical inspection, dynamic events and a four-hour endurance race.",
  events: [
    { name: "aBAJA SAEINDIA", detail: "Autonomous category. 2025 at GARC Oragadam, Chennai; 2026 at Sri Sairam Engineering College, Chennai." },
    { name: "eBAJA SAEINDIA", detail: "Electric category. 2025 at BV Raju Institute of Technology, Hyderabad; 2026 at NATRAX, Pithampur." },
  ],
};

// Sub-teams. Names follow the team's own department list (abhyuday-racing-web team.ts);
// the descriptions come from baja/src/lib/content.ts.
export const subteams = [
  { name: "Autonomy", role: "The brain", body: "Perception and software: object, lane, sign and light detection with Python, OpenCV, YOLO and ROS 2." },
  { name: "Drive-by-wire", role: "The body", body: "Steering, throttle and brake actuators over CAN, with Arduino and STM32 controllers." },
  { name: "Mechanical", role: "The frame", body: "Chassis, suspension and fabrication — designed in CAD and built in our workshop." },
  { name: "Electrical", role: "The nerves", body: "Wiring harnesses, sensors, battery and power distribution that keep every system alive." },
  { name: "Documentation and sponsorship", role: "The memory & fuel", body: "Design reports and presentations that earn competition points, and the partner outreach that keeps us racing." },
];

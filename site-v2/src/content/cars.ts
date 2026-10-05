// Every car the team has built, newest first. Each car with `built: true` gets a page at /cars/<slug>/.
// Sources: abhyuday-racing-web/src/content/home.ts (garage, season 2026, autonomy), results.ts,
// media.ts (photos); baja/src/lib/content.ts (eBAJA platform: 72V pack, 2WD).
//
// Photos are file names in media/originals (no extension). If the file does not exist yet,
// the matching placeholder in public/placeholders is shown instead.
// Specs: use "TBA" for anything not confirmed. Never guess numbers.

export type Spec = { label: string; value: string };
export type CarAngle = { photo: string; alt: string; stat: string; label: string };

export type Car = {
  slug: string;
  name: string;
  year: number;
  category: "aBAJA" | "eBAJA";
  built: boolean;
  current?: boolean;
  tagline: string;
  description: string;
  photo: string;
  photoAlt: string;
  gallery: { photo: string; alt: string; caption: string }[];
  keySpecs: Spec[]; // up to 4, shown on the home cards
  specs: Spec[]; // full spec sheet on the detail page
  highlights: { title: string; body: string }[];
  results: { title: string; result: string; win?: boolean }[];
  // Featured-car reveal on the home page: one key fact per angle.
  angles?: CarAngle[];
  // 3D model in public/models. Leave empty to show the placeholder.
  model?: string;
  modelNote?: string;
  timelineTitle?: string;
  timelineLede?: string;
  timeline?: { when: string; title: string; body: string; result?: boolean }[];
};

export const cars: Car[] = [
  {
    slug: "a10",
    name: "A10",
    year: 2026,
    category: "aBAJA",
    built: true,
    current: true,
    tagline: "Emergency braking winner. Manufacturing Excellence winner.",
    description:
      "A10 is our 2026 autonomous buggy. A camera and radar see the course, ROS 2 software decides what to do, and drive-by-wire motors work the throttle, brake and steering. Six months took it from first simulation to the podium at aBAJA SAEINDIA 2026 in Chennai.",
    photo: "hero-a10-aeb-run",
    photoAlt: "A10, an orange, blue and purple autonomous buggy, driving past the camera during a test run",
    gallery: [
      { photo: "aeb-stop", alt: "A10 stopped in front of an obstacle during the emergency braking test", caption: "The emergency braking test, Chennai" },
      { photo: "pit-bay", alt: "A10 in the team's pit bay at the aBAJA finals", caption: "In the pit bay at the finals" },
      { photo: "camera-bring-up", alt: "Team members bringing up the camera and compute on A10", caption: "Camera and compute bring-up" },
      { photo: "hil-testing", alt: "Hardware-in-the-loop test bench for A10", caption: "Hardware-in-the-loop testing" },
      { photo: "night-testing", alt: "A10 being tested at night under floodlights", caption: "Night testing before transport" },
      { photo: "three-trophies", alt: "The three trophies won with A10", caption: "Three trophies at aBAJA 2026" },
    ],
    keySpecs: [
      { label: "Class", value: "aBAJA · autonomous" },
      { label: "Perception", value: "Camera + radar" },
      { label: "Software", value: "ROS 2" },
      { label: "Actuation", value: "Drive-by-wire" },
    ],
    specs: [
      { label: "Category", value: "aBAJA SAEINDIA (autonomous)" },
      { label: "Season", value: "2026" },
      { label: "Perception sensors", value: "Camera and radar" },
      { label: "Software stack", value: "ROS 2" },
      { label: "Simulation", value: "MATLAB Simulink, IPG CarMaker" },
      { label: "Vehicle network", value: "CAN" },
      { label: "Actuation", value: "Drive-by-wire throttle, brake and steering" },
      { label: "Autonomy features", value: "Emergency braking, adaptive cruise (following at a safe gap), lane keeping, sign and traffic-light recognition" },
      { label: "Kerb weight", value: "TBA" },
      { label: "Power", value: "TBA" },
      { label: "Top speed", value: "TBA" },
      { label: "Compute platform", value: "TBA" },
    ],
    highlights: [
      { title: "See", body: "The camera and radar watch the lane ahead." },
      { title: "Recognise", body: "Software picks out lanes, obstacles, signs and lights." },
      { title: "Decide", body: "Braking, following and lane-keeping logic chooses what to do." },
      { title: "Check", body: "Each command is compared with what the car actually did, and corrected." },
      { title: "Act", body: "Motors move the throttle, brake and steering." },
    ],
    results: [
      { title: "aBAJA 2026 · Autonomous Emergency Braking", result: "Winner", win: true },
      { title: "aBAJA 2026 · Manufacturing Excellence", result: "Winner", win: true },
      { title: "aBAJA 2026 · MathWorks Advanced Simulation", result: "First runner-up" },
      { title: "aBAJA 2026 · Virtual round", result: "All India Rank 2" },
    ],
    angles: [
      { photo: "hero-a10-aeb-run", alt: "A10 side view on a test run", stat: "Winner", label: "Autonomous Emergency Braking" },
      { photo: "aeb-stop", alt: "A10 front three-quarter view stopping for an obstacle", stat: "Camera + Radar", label: "Perception" },
      { photo: "pit-bay", alt: "A10 in the pit bay", stat: "Winner", label: "Manufacturing Excellence" },
      { photo: "night-testing", alt: "A10 under floodlights at night", stat: "AIR 2", label: "Virtual round" },
    ],
    model: "/models/a10.glb",
    modelNote: "Our CAD model of the A10 chassis, roll cage and suspension. Body panels and sensors are not in this version yet. About 2.5 MB — it loads only when you ask.",
    timelineTitle: "Six months from first simulation to the podium",
    timelineLede: "Budget approval pushed the build back to late May, so a core crew of five or six lived in the workshop through the summer.",
    timeline: [
      { when: "Mid April", title: "Simulation starts", body: "Control logic built in MATLAB Simulink and IPG CarMaker." },
      { when: "Late May", title: "Build starts", body: "Budget approved and work moves to the workshop." },
      { when: "31 May", title: "Virtual round", body: "All India Rank 2.", result: true },
      { when: "8 June", title: "Drive-by-wire check", body: "Judges evaluate the actuation system." },
      { when: "June to July", title: "Living in the workshop", body: "Wiring, mounts, software and night testing under floodlights." },
      { when: "25 July", title: "Loaded up", body: "A10 leaves Pune for Chennai." },
      { when: "29 Jul – 2 Aug", title: "Finals", body: "Three awards at Sri Sairam Engineering College.", result: true },
    ],
  },
  {
    slug: "abaja-2025",
    name: "aBAJA debut car",
    year: 2025,
    category: "aBAJA",
    built: true,
    tagline: "First autonomous entry. All India Rank 5.",
    description:
      "Our first autonomous car of our own, raced in our debut aBAJA season at the Global Automotive Research Centre, Oragadam, Chennai. It finished All India Rank 5 overall and won Best Adaptive Cruise Control.",
    photo: "car-2025-abaja",
    photoAlt: "Photo of the 2025 aBAJA car (placeholder)",
    gallery: [],
    keySpecs: [
      { label: "Class", value: "aBAJA · autonomous" },
      { label: "Overall", value: "AIR 5" },
      { label: "Award", value: "Best ACC" },
      { label: "Venue", value: "GARC Chennai" },
    ],
    specs: [
      { label: "Category", value: "aBAJA SAEINDIA (autonomous)" },
      { label: "Season", value: "2025" },
      { label: "Perception sensors", value: "TBA" },
      { label: "Software stack", value: "TBA" },
      { label: "Kerb weight", value: "TBA" },
      { label: "Power", value: "TBA" },
      { label: "Top speed", value: "TBA" },
    ],
    highlights: [
      { title: "Autonomous debut", body: "The team's first self-driving car, built for the second edition of aBAJA SAEINDIA." },
      { title: "Adaptive cruise control", body: "Won Best Adaptive Cruise Control: following another vehicle at a safe gap." },
    ],
    results: [
      { title: "aBAJA 2025 · Overall", result: "All India Rank 5" },
      { title: "aBAJA 2025 · Best Adaptive Cruise Control", result: "Winner", win: true },
    ],
  },
  {
    slug: "ebaja-2024",
    name: "First eBAJA car",
    year: 2024,
    category: "eBAJA",
    built: true,
    tagline: "Where it started. Our first car of our own.",
    description:
      "Our first electric off-roader, designed, welded and assembled in our own workshop and unveiled on campus on 1 March 2024. It started the team's eBAJA programme.",
    photo: "car-2024-ebaja",
    photoAlt: "Photo of the 2024 eBAJA car (placeholder)",
    gallery: [],
    keySpecs: [
      { label: "Class", value: "eBAJA · electric" },
      { label: "Unveiled", value: "1 Mar 2024" },
      { label: "Pack", value: "72 V" },
      { label: "Drive", value: "2WD" },
    ],
    specs: [
      { label: "Category", value: "eBAJA SAEINDIA (electric)" },
      { label: "Season", value: "2024" },
      { label: "Powertrain", value: "Electric motor and controller" },
      { label: "Battery", value: "72 V pack with battery management system" },
      { label: "Drivetrain", value: "2WD" },
      { label: "Safety", value: "High-voltage safety systems" },
      { label: "Chassis", value: "Designed, welded and assembled in our workshop" },
      { label: "Kerb weight", value: "TBA" },
      { label: "Top speed", value: "TBA" },
    ],
    highlights: [
      { title: "Built in-house", body: "Chassis designed, welded and assembled by students in the team workshop." },
      { title: "Electric powertrain", body: "Motor, controller and a battery pack with its own management system." },
    ],
    results: [{ title: "eBAJA 2024", result: "Debut — unveiled 1 March 2024" }],
  },
  {
    slug: "2027",
    name: "Next car",
    year: 2027,
    category: "aBAJA",
    built: false,
    tagline: "In design now. We'll show it here first.",
    description: "Reveal date to be announced.",
    photo: "car-2027-next",
    photoAlt: "Placeholder for the 2027 car",
    gallery: [],
    keySpecs: [],
    specs: [],
    highlights: [],
    results: [],
  },
];

export const builtCars = cars.filter((c) => c.built);
export const featuredCar = cars.find((c) => c.current) ?? builtCars[0];

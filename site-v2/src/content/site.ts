// Team-wide details used across the site: name, contact, socials, navigation.
// Sources: abhyuday-racing-web/src/content/site.ts and baja/src/lib/site-config.ts (founded year).

export const site = {
  name: "Team Abhyuday Racing",
  shortName: "Abhyuday Racing",
  tagline: "Rise. Conquer. Repeat.",
  // Hashtag typed out in the landing intro.
  introTag: "#RISE CONQUER REPEAT",
  college: "G. H. Raisoni College of Engineering & Management, Pune",
  collegeShort: "GHRCEM Pune",
  founded: 2023,
  description:
    "Team Abhyuday Racing is the student motorsport team of G. H. Raisoni College of Engineering & Management, Pune. We design, build and race autonomous (aBAJA) and electric (eBAJA) off-road cars for BAJA SAEINDIA.",
  // Change to the real address once the new site is deployed (used for sitemap and share previews).
  url: "https://abhyuday-racing-web.vercel.app",
  email: "abhyudayghrcem2023@gmail.com",
  // TODO: not in the repos. Leave empty to hide.
  phone: "",
  // TODO: full postal address not in the repos. Leave empty to show only the college name.
  address: "",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/teamabhyudayracing" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/teamabhyudayracing" },
    { label: "YouTube", href: "https://www.youtube.com/@teamabhyudayracing" },
    { label: "Facebook", href: "https://www.facebook.com/teamabhyudayracing" },
  ],
  // Hero background video. Drop the file at public/media/hero.mp4 and set this to "/media/hero.mp4".
  // While empty, the hero shows the A10 photo with the point-cloud animation.
  heroVideo: "",
  // Sponsorship brochure. Replace public/docs/sponsorship-brochure.pdf with the real file.
  brochureUrl: "/docs/sponsorship-brochure.pdf",
  // Recruitment form link. Leave empty to point people to the email address instead.
  applyUrl: "",
};

// One entry per section of the home page, in scroll order. `id` is the #anchor.
export const sections = [
  { id: "home", label: "Home" },
  { id: "team", label: "Team" },
  { id: "achievements", label: "Achievements" },
  { id: "cars", label: "Cars" },
  { id: "gallery", label: "Gallery" },
  { id: "partners", label: "Partners" },
  { id: "support", label: "Support Us" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

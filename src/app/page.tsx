import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Cars } from "@/components/sections/Cars";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Support } from "@/components/sections/Support";
import { Team } from "@/components/sections/Team";

// One long page: Home → Team → Achievements → Cars → Gallery → Partners → Support Us.
export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <div id="home">
          <Hero />
          <About />
        </div>
        <Team />
        <Achievements />
        <Cars />
        <Gallery />
        <Partners />
        <Support />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLeft } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and films from Team Abhyuday Racing's seasons at aBAJA and eBAJA SAEINDIA, filtered by event.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <Nav onHome={false} />
      <main id="main" className="section" style={{ paddingTop: "calc(var(--nav-h) + clamp(48px, 7vw, 96px))" }}>
        <div className="wrap">
          <nav className="crumbs hud" aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
            <Link href="/#gallery">
              <ArrowLeft size={16} /> Back to home
            </Link>
          </nav>
          <h1 className="visually-hidden">Team Abhyuday Racing gallery</h1>
          <SectionHead
            index="05"
            kicker="Gallery"
            id="gallery-page-title"
            title={
              <>
                The full <em>album</em>
              </>
            }
            lede="Pick an event to filter. Click any photo to open it full screen."
          />
          <GalleryBrowser />
        </div>
      </main>
    </>
  );
}

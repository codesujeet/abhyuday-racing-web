import Link from "next/link";
import { Nav } from "@/components/layout/Nav";

export default function NotFound() {
  return (
    <>
      <Nav onHome={false} />
      <main id="main" className="section" style={{ minHeight: "80svh", display: "grid", alignItems: "center" }}>
        <div className="wrap" style={{ display: "grid", gap: 20 }}>
          <p className="hud hud-orange">Error 404 // Off track</p>
          <h1 className="sec-title">
            Wrong <em>turn</em>
          </h1>
          <p className="lede">This page doesn&apos;t exist. Let&apos;s get you back on the course.</p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

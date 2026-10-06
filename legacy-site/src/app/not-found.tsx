import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="wrap" style={{ display: "grid", gap: 20 }}>
        <h1 className="display">Off the track</h1>
        <p className="lede muted">This page doesn&apos;t exist. It may have moved, or the link has a typo.</p>
        <div className="btn-row">
          <Link className="btn btn-navy" href="/">
            Back to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}

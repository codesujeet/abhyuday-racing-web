import { Chevrons } from "./Chevrons";

/** Navy title band for inner pages, carrying the same chevron band as the homepage. */
export function PageHead({ title, lede }: { title: string; lede: string }) {
  return (
    <section className="page-band" aria-labelledby="page-title">
      <div className="page-band-body">
        <h1 className="display" id="page-title">
          {title}
        </h1>
        <p>{lede}</p>
      </div>
      <Chevrons className="chevrons page-band-chevrons" />
    </section>
  );
}

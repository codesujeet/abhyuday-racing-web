# Credits

## Photos, film stills and 3D model

- Photos in `media/originals/` were taken by Team Abhyuday Racing members during the 2026 season. The hero and braking photos are stills from the team's own video of the AEB test. They belong to the team and are not covered by any open licence.
- `public/models/a10.glb` comes from the team's CAD model of A10, first exported in the earlier team site repository (github.com/cipheroot6/baja), and was simplified with `scripts/optimize-model.mjs`.
- The team emblem in `media/originals/emblem.png` is the team's current logo, used until the new one is ready.

## Partner logos

Partner logos in `public/partners/` are trademarks of their owners, shown to credit their support. Where each file came from is listed in `public/partners/SOURCES.txt`. Replace any logo with the version from the partner's own brand kit when available.

## Season data

Dates and venues in `src/content/seasons.ts` come from BAJA SAEINDIA press releases and registration guidelines (bajasaeindia.org) and from host and press reports linked next to each season on the site. Team results are from team records.

## Fonts

- [Anybody](https://fonts.google.com/specimen/Anybody) by Tyler Finck, SIL Open Font License 1.1
- [Atkinson Hyperlegible Next](https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next) by the Braille Institute, SIL Open Font License 1.1

Both are self-hosted at build time by `next/font`.

## Open-source libraries

| Library | Licence | Used for |
|---|---|---|
| [Next.js](https://nextjs.org), [React](https://react.dev) | MIT | Site framework |
| [@google/model-viewer](https://modelviewer.dev) | Apache-2.0 | 3D car viewer |
| [Embla Carousel](https://www.embla-carousel.com) | MIT | Car-by-year carousel |
| [PhotoSwipe](https://photoswipe.com) | MIT | Photo lightbox on the media page |
| [sharp](https://sharp.pixelplumbing.com) | Apache-2.0 | Photo resizing (build only) |
| [glTF Transform](https://gltf-transform.dev), [meshoptimizer](https://github.com/zeux/meshoptimizer) | MIT | 3D model compression (build only) |

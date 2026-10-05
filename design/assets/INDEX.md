# Asset inventory

All assets are local. Paths below are relative to this folder.

**The website illustrations are visual references, not a menu of poster hero images.** Inspect their palette and path vocabulary, then draw event-specific inline SVG in the composition's coordinate system. Do not paste these completed rectangles into a reserved illustration slot. Logos and QR codes remain functional assets.

| Asset | Purpose | Provenance |
|---|---|---|
| `brand/wordmark.svg` | Main CAIA signature | Website `public/serif-logo.svg` |
| `brand/mark.svg` | Compact CAIA symbol | Website `public/logo.svg` |
| `fonts/young-serif.ttf` | Display headlines, weight 400 | Google Fonts, YoungSerif-Regular.ttf |
| `fonts/inter-variable.ttf` | Body/logistics, weights 100–900 | Google Fonts, Inter[opsz,wght].ttf |
| `fonts/*-OFL.txt` | Font redistribution licenses | Google Fonts, each family's OFL.txt |
| `tokens.css` | Local font declarations + palette | CAIA website tokens, adapted for standalone posts |
| `illustrations/community-blocks.svg` | Four-column rising blocks | Website graphic, use sparingly |
| `illustrations/shared-orbits.svg` | Collaboration / pluralism | Website graphic |
| `illustrations/aligned-trajectories.svg` | Alignment / convergence | Website graphic |
| `illustrations/attention-patterns.svg` | Evaluation / interpretability | Website graphic |
| `illustrations/neural-pathways.svg` | Networks / research | Website graphic |

Copied from the CAIA repository on 2026-09-22. Logos and site artwork are supplied for CAIA communications; no broader third-party reuse rights are implied. Preserve font licenses. The kit intentionally excludes headshots and partner logos because they should be added only when relevant to a confirmed event. Do not invent speaker portraits or imply partner sponsorship from past organizational relationships.

Fonts were downloaded from these original files:

- https://raw.githubusercontent.com/google/fonts/main/ofl/youngserif/YoungSerif-Regular.ttf
- https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf

For new art, follow `references/svg-composition.md`. The revised example's SVG is authored in `templates/compose.js`, measured against the actual headline and sharing its canvas with the divider rules. Event-local artwork code should stay with that composition rather than becoming a stock illustration for future posts.

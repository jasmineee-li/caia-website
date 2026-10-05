# Visual system

## Composition intent

CAIA is a research community. Be intellectually serious and approachable. Make the topic immediately understandable, then make attendance easy. Prefer concrete titles such as “Can we trust AI?” over inflated promises. Do not imply sponsors, endorsements, or affiliations absent from the brief.

Treat the poster as one composition of HTML typography and inline SVG. Establish a reading hierarchy: identity and topic, invitation, logistics, action. This is an order of attention, not a stack of mandatory rows. Geometry can frame a keyword, lead the eye, or become a divider between information groups. Every curve, gap, and text block should relate to that hierarchy. Do not allocate a standalone illustration compartment and fill it afterwards.

Use the canonical sources linked in `SKILL.md` as construction examples, then design for the actual brief. Read [SVG composition](svg-composition.md) before drawing.

## Tokens inherited from the website

| Role | Value | Usage |
|---|---|---|
| Canvas | `#FFFFFF` | Open space and QR backing |
| Main ink | `#0F172A` | Headlines, logistics, QR modules |
| Supporting ink | `#334155` | Description and secondary details |
| Action red | `#B31B1B` | CTA and restrained emphasis |
| Navy | `#1E293B` | Geometry anchors |
| Cyan | `#0EA5A3` | Selected SVG paths |
| Border | `#E2E8F0` | Quiet rules and outlines |
| Aqua ramp | `#D7EEF2`, `#BFE3E8`, `#A9DADD`, `#8BCED1`, `#6BBFC3` | Supporting geometry |
| Warm accent | `#CF6062` | A focal node or block |

Use `assets/tokens.css` and bundled fonts. The palette derives from the website's `src/styles/tokens.css`, `src/styles/utilities.css`, and `public/graphics/community-blocks.svg`, copied into the kit on 2026-09-22. Keep the canvas predominantly white/light. Pale aqua is unsuitable for essential text. Use a visible but quiet square grid. The current example uses 48px cells with 2px navy lines at 7% opacity, without an extra fade that makes it disappear. Check it at native size and in the phone preview. Exclude it from the QR and any areas where it reduces clarity. Grid spacing should relate to the composition rather than dictate text placement.

## Typography and spacing relationships

Use Young Serif regular, weight 400, for the main headline and Inter for metadata, labels, body, and CTA. No synthetic bold on Young Serif. Use sentence case and normal label tracking. Do not flatten the hierarchy by giving every text role similar size, weight, or space.

Choose type from the actual copy and available width. There are no inherited pixel-size ceilings or fixed headline line-count caps. A short title may warrant a much larger display scale; a longer title needs editorial line breaks and a different composition. The final headline word may occupy its own line when its emphasis is intentional. Avoid accidental orphan words, cramped tracking, or shrinking logistics to rescue a layout.

1. Set the headline's desired dominance and meaningful line breaks. Establish readable date/time/location and CTA, then fit supporting copy around those priorities.
2. Load the bundled fonts before measuring. Inspect the actual headline lines, final keyword, and metadata text bounds; a full-width section rectangle is not the text's visual extent. See the measurement recipe in [SVG composition](svg-composition.md).
3. Choose a spacing unit from the type's rhythm. Keep related metadata closer together than separate groups. Related details on the same row must share font size, line height, and baseline. In particular, time and the food note use the same type token in each format. Let the headline-to-invitation gap be smaller than the break into logistics. Coordinate margins, rule offsets, ellipse clearance, and QR separation with that rhythm.
4. Adjust optically: serif overhangs, capitals, punctuation, and curved strokes affect perceived gaps. An ellipse must breathe around the word without touching glyphs; a rule should separate groups without underlining unrelated text.
5. Inspect the 432px preview. Its scale is `432 / canvas width`; assess actual readability at that size. Increase essential type or shorten supporting copy when reading requires zooming. Do not use a successful bounds check as a reason to preserve weak hierarchy.

Use clear dates with years, timezones, and a real en dash in time ranges. Put long room names on a deliberate line. Avoid em dashes and middle-dot dividers in promotional copy. Captions carry explanations, accessibility details, biographies, and the clickable link.

## Brand and geometry

Use `assets/brand/wordmark.svg` at its native aspect ratio with clear space of at least one quarter of its height. Do not recolor, crop, distort, or rebuild the letters. The compact mark is secondary. This identity use is distinct from decorative illustration.

Bundled illustration SVGs and SVGs in examples are reference vocabulary only, never default hero illustrations. Study their palette, curve character, sparse nodes, or rounded blocks, then construct geometry for the current topic and text arrangement. The site's block motif has four bottom-aligned columns containing 1, 1, 2, and 3 blocks; it is vocabulary, not a required ornament.

The starter direction combines an ellipse around the final headline word with a path that continues into a layout divider. Its position and proportions come from measured typography and content anchors. Keep headline and metadata as HTML. Compose custom inline SVG in the same coordinate system, with masks/exclusion zones protecting glyphs, brand clear space, and the complete QR. Follow [SVG composition](svg-composition.md) for the construction process.

Use one relevant conceptual idea, a few path families, and restrained focal color. Explain what the geometry contributes to this particular subject and reading flow. Avoid generic AI networks, stock robots, neon, meaningless waves, and invented scientific measurements. Keep diagrammatic relationships honest. A CTA can be plain red type or a light outlined pill when the composition supports it; avoid cards, shadows, and heavy containers around every detail.

## Independent format composition

**Instagram, 1080 × 1350:** Use the height to establish a strong headline, a readable invitation, and coherent logistics/action grouping. Allow geometry to connect these elements across the canvas. Choose margins and gaps from the actual composition, with enough breathing room around the brand and QR. Do not stretch this composition to another ratio.

**LinkedIn, 1200 × 627:** Start a separate layout from the same message and hierarchy. Reconsider headline scale, line breaks, keyword emphasis, metadata grouping, QR position, ellipse proportions, and divider routing for the wider, shorter canvas. The title may span the width and a curve may transition into a horizontal information rule; those are possibilities, not a required arrangement. Do not derive landscape by shrinking portrait or assigning an illustration to the right. Measure again and rebuild anchors and exclusions for this format. The caption supplies a clickable action for viewers on the same phone.

**Other requested formats:** Recompose for their dimensions and viewing conditions. For Stories, allow room for app controls and a native link sticker, then inspect the actual placement. Defaults in this kit describe requested outputs, not guaranteed platform limits or safe areas.

## QR and factual content

Use the exact confirmed event URL. Generate a real QR deterministically, with dark modules on white, square proportions, and a four-module quiet zone. Keep a solid white backing over its entire footprint and exclude all grid, paths, nodes, and rules from it. Determine QR size from module density and rendered decoding, then balance its visual weight with the CTA. Never distort, decorate, or AI-generate the QR.

Check native and 432px-preview decoding and perform a phone scan when available. Report any unperformed checks. Confirm caption destination and event facts. A calendar QR must be labeled as calendar discovery, not event RSVP. Include confirmed food only; do not invent missing logistics.

Fictional studies must visibly say “Design study / Not a real event” in both formats and disclose fictional facts in the caption. Give the sample label sufficient size and contrast for the preview, and mark it `data-critical` in bespoke layouts. Missing facts remain visible draft placeholders; do not claim readiness to publish.

## Visual review is a separate requirement

Passing tests does not mean good design. Inspect each exported native image and its small preview, then compare revisions. Record specific findings about headline dominance, line breaks, spacing relationships, ellipse fit, path-to-divider continuity, text/QR clearance, and landscape balance. Look for cramped islands of content, arbitrary empty areas, decorative tangencies, and unreadable logistics even when no rectangles overlap.

Fix the composition and re-export when those findings reveal weaknesses. Keep automated results, observed visual findings, and unresolved limitations distinct. Describe examples by their purpose and observable behavior; do not infer user approval from an agent's review or a successful export.

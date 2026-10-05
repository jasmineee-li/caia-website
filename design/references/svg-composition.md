# Inline SVG as part of poster composition

## Design contract

Typography and SVG share one layout. Build editable HTML text and an inline SVG overlay inside the same poster root. The starter direction emphasizes the final headline word with an ellipse and uses a custom path that becomes the divider into the next information group. Metadata remains HTML. Decorative geometry is not an `img src`, background-image asset, or independent art panel.

Existing illustration SVGs are reference vocabulary only, never default hero illustrations. Inspect how their paths, colors, and nodes behave; draw new geometry relevant to the topic and actual text arrangement. Brand wordmarks and deterministically generated QR codes have separate identity and functional roles.

The canonical sources are `examples/test-event/instagram.html` and `examples/test-event/linkedin.html`, with `templates/poster.css` and `templates/compose.js`; inspect the pair through `examples/test-event/preview.html`. The renderer supports `titleLines` for deliberate headline breaks and `focusText` for the emphasized final word. Keep both consistent with the actual title. There is no illustration input or standalone image slot. Treat these sources as a starting composition to adapt and review for each brief.

## Establish a shared coordinate system

Before drawing, name the visual idea in one sentence and explain what it does in the layout. Do not default to this example's ellipse. For a community post, a few simple figures can share a baseline with the invitation and extend joined hands into its surrounding space. For an interpretability talk, a sparse matrix can grow out of background grid cells and expose a highlighted token beside the title. For a reading group, margin brackets and page-fold geometry can organize a short quotation and its attribution. Each needs newly drawn geometry at the current text positions, not a reused finished picture. Keep people, nodes, and paths subordinate to the message, and do not invent charts or data.

Use the poster's design dimensions for both the HTML layout and the SVG `viewBox`: for example, `0 0 1080 1350` for portrait and `0 0 1200 627` for landscape. Give the poster a positioned root and the overlay the same origin and full extent. Maintain the poster aspect ratio in previews so HTML and SVG scale together. Avoid independent overlay padding, cropping, or transforms that separate its coordinates from the text.

Use named layout anchors: content-left, headline baseline/line bounds, keyword bounds, logistics top, divider height, and QR bounds. Derive geometry from these anchors rather than scattering unrelated coordinates. Define stacking deliberately: quiet fills/grid at the back, structural strokes behind readable HTML, and the QR's opaque white backing over all decoration. An overlay can have `pointer-events: none` so it does not intercept HTML interaction.

Purely decorative SVG should be hidden from assistive technology. If geometry conveys information not present in the text, give it a useful accessible title/description and include that meaning in the post's alt text. Do not duplicate all metadata in SVG text. Keep SVG self-contained, with explicit fills/strokes and no external resources or embedded scripts; composition logic belongs in the local HTML/JavaScript source.

## Measure font-loaded text

1. Load Young Serif 400 and the Inter weights actually used. Wait for `document.fonts.ready` and confirm those faces loaded successfully before trusting measurements. A fallback font's bounds are not usable design anchors.
2. Lay out the real copy with the intended width, size, tracking, and line height. Wrap the final headline word in an inline span so its bounds can be measured while retaining semantic HTML. Keep it intact when that is the intended emphasis; if it no longer fits, recompose the headline.
3. Measure line fragments and the keyword with DOM ranges/`getClientRects()`; use element bounds for intentionally fitted blocks. Do not treat a full-width heading or section's box as the word's bounds. DOM rectangles describe layout boxes, not exact glyph ink; inspect serif overhangs and punctuation in the render before finalizing clearance.
4. Convert viewport measurements into poster coordinates. For an axis-aligned preview scaled uniformly to the poster, with poster rectangle `P` and measured rectangle `R`, use `x = (R.left - P.left) * W / P.width`, `y = (R.top - P.top) * H / P.height`, `width = R.width * W / P.width`, and `height = R.height * H / P.height`. `W` and `H` are the design dimensions. This assumes the poster and SVG share the same origin without extra border/padding offsets. With other transforms or viewBox mappings, use the inverse SVG screen transformation matrix to map the rectangle corners.
5. Recalculate after any copy, font, size, tracking, width, spacing, or format change. Finish geometry and masks before capture. A screenshot taken after fonts load but before the overlay updates is still premature.

## Build the keyword ellipse

Begin with the measured final word's center and half-width/half-height. Expand its radii with deliberate horizontal and vertical clearance related to the headline's type size, including half the stroke width. Bounding-box corner clearance alone does not guarantee ellipse clearance: the curve narrows toward its ends. Inspect the first and last letters, ascenders, descenders, and adjacent lines, then adjust radii and center optically.

The ellipse should read as emphasis on that word, not a sticker hovering near it. Keep its stroke subordinate to the headline and leave enough air that glyphs do not seem enclosed in a tight button. A slight tilt is possible only when it improves emphasis and still clears the word and neighboring text. If fit fails, revise line breaks, scale, or spacing along with the geometry. Do not squash the ellipse or text simply to preserve an old coordinate.

Use a complete ellipse or a deliberate gap at the connecting path. Make the junction legible: either a clean continuation with a matching tangent or a purposeful separation. Avoid accidental double strokes and nearly touching curves.

## Draw a path that becomes a divider

Choose a departure point and tangent on or near the keyword ellipse. Route a small number of smooth Bézier segments through available space toward the boundary between headline/invitation and logistics. Align the final segment with that boundary so the curve becomes a straight layout rule. Set its endpoint from the content margin or a meaningful column edge, stopping before any QR exclusion zone.

The path must do layout work: guide attention from the emphasized word into event information and separate groups with deliberate space on each side. Coordinate its bends and rule height with the actual text bounds. Avoid arbitrary waves, abrupt kinks, and a second CSS border underneath the same SVG divider. Use a few consistent stroke weights and rounded caps where appropriate; inspect their apparent weight in the small preview.

Add nodes, blocks, or secondary paths only when they contribute a specific relationship relevant to the event. For an evaluation topic, for example, a controlled checkpoint in a route can suggest inspection without inventing measured results. Recoloring an unrelated stock network does not make its geometry relevant. The ellipse/divider establishes the starter's integration pattern; custom supporting geometry must be designed with the current content.

## Protect text, brand, and QR

Construct exclusion zones from the same font-loaded measurements and layout anchors used by the paths. Expand text rectangles with optical clearance and stroke allowance. Use per-line rectangles when a large paragraph box would erase an intentional path through genuine whitespace. Include brand clear space and essential labels.

Use an SVG mask to hide decorative geometry inside these zones, with `maskUnits="userSpaceOnUse"` and `maskContentUnits="userSpaceOnUse"`, explicit full-canvas bounds, a white reveal field, and black exclusion shapes. Apply the mask to the relevant decorative group, not to the HTML or functional QR. Keep the keyword's protective zone inside the ellipse's intended clearance so the mask does not accidentally erase the emphasis stroke. If masking makes a route appear randomly broken, reroute it; masks are a safeguard, not a substitute for composition.

Exclude the entire QR square, including its four-module quiet zone, with additional separation from nearby strokes. Keep an opaque white backing as well. Protect it from the HTML/CSS background grid too; an SVG mask cannot hide a separate CSS layer. No paths, rules, nodes, or grid lines may enter that square. Recheck the rendered QR after every layout change.

## Recompose landscape independently

Build a new hierarchy and anchor map for the wider, shorter canvas. Re-measure headline lines and the final word, then redraw the ellipse, route, divider, and exclusions. Review where logistics, CTA, and QR belong in this composition. A broad headline with a shallow connecting curve into an information band is one possible solution; the brief and type must determine the arrangement.

Do not scale portrait geometry into landscape or assign a default right-side art area. Preserve the conceptual idea and brand language while changing proportions, rhythm, grouping, and path topology as needed. A portrait and landscape pair should look related and each feel intentionally composed.

## Review the actual composition

Inspect exported images at native size and 432px width. Technical QA verifies only part of the result. Explicitly assess:

- Does the headline dominate, with readable logistics and a secondary CTA?
- Does the ellipse fit the final word naturally, with clear glyphs and breathing room?
- Does the path guide attention and become a meaningful divider, with coherent gaps above and below?
- Are margins, group spacing, and optical alignments deliberate rather than merely collision-free?
- Do masks preserve text and the complete QR without producing unexplained gaps or tangencies?
- Is the geometry relevant, and does landscape have its own balanced hierarchy?

Compare revisions, document concrete weaknesses and corrections, and re-export after changes. Passing tests does not mean good design. Preserve actual QA output; report what was visually inspected and what remains unresolved. Do not infer user approval from technical checks or an agent's review.

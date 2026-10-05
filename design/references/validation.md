# Validation and design revision

Updated 2026-09-22.

The first independent-agent examples passed technical export tests but the user rejected their spacing, type scale, composition, and detached SVG artwork. Those examples have been removed. Passing bounds and QR checks did not establish design quality.

## Revised approach

- A larger, deliberately broken headline leads the composition.
- Event details form clear groups, with a dedicated landscape information column rather than a reduced portrait layout.
- There is no reserved illustration row and no decorative `<img>` element.
- Custom inline SVG measures the loaded headline and surrounds its focus word. The curve continues into an information divider, so the geometry belongs to the typography and layout.
- Text and QR exclusion zones provide a last safeguard. Paths are routed around text first; masks are not a substitute for composing the route.
- The first local revision had an awkward curve disappearing behind the summary. The next revision rerouted it through open space, fixed the lens/handle junction, separated the ellipse from the preceding letter, and increased the portrait title size.
- `references/svg-composition.md` explains how to develop a new integrated concept rather than reuse this lens for every topic. Bundled website SVGs are reference material only.

## Technical checks

The revised Instagram and LinkedIn examples export to exact-size PNG/JPEG, use the bundled fonts, pass bounds/overlap checks, and decode to the intended calendar destination at native and 432px preview sizes. The exporter waits for the SVG composition promise after fonts resolve. Schedule validation, optional catering, explicit sample flags, and calendar/event CTA checks remain in place.

The renderer rejects the removed `illustration` input and mismatched title fragments, rather than silently producing a stock-image composition. Longer copy requires reflowing the source and rerouting geometry. There is no claim that arbitrary event copy automatically fits the sample layout.

No physical phone scan, platform recompression test, external publishing, or user approval of the revised designs is implied. Review the actual images. The current sources and previews are in `examples/test-event/`.

## Latest typography and spacing pass

The event-type eyebrow was removed and both headlines moved up. Time and food share size, line-height, and margin tokens: 33px in portrait, 27px in landscape. Their portrait row starts at the same pixel position. Grid lines are now explicitly visible at 7% navy opacity with 2px strokes so they survive downsampling, without the compounded fade. The isolated corner was removed, the portrait footer brought closer to logistics, and the landscape title enlarged. The ellipse was optically centered on the glyphs and the route now derives its rails/dividers from actual layout bounds.

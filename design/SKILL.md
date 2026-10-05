---
name: caia-social-design
description: Use when designing Cornell AI Alignment Instagram and LinkedIn posts, including event announcements, talks, workshops, socials, and research highlights, with the portable CAIA design kit.
---

# Cornell AI Alignment social design

Create posts that look like the CAIA website: scholarly, clear, welcoming, and technically thoughtful. Compose typography, spacing, and inline SVG together. A strong serif headline carries the message; geometry emphasizes specific words, connects content, and defines divisions in the layout. Red indicates action, aqua supports geometry, navy carries information. Avoid a generic technology-conference aesthetic.

This folder is a portable kit. Its fonts, source templates, and scripts work without access to the website repository. Read this file first, then [the design system](references/design-system.md), [SVG composition](references/svg-composition.md), and [export guidance](references/export.md). Assets and their provenance are listed in [assets/INDEX.md](assets/INDEX.md).

Bundled illustration SVGs are reference vocabulary only, never default hero illustrations. Design new geometry for each message and layout. The supplied brand marks retain their identity role.

## Deliverables and formats

- Default Instagram feed: **1080 × 1350 px**, portrait 4:5, opaque PNG and JPEG. This is the kit's compatibility default, not a claim that 4:5 is Instagram's maximum.
- LinkedIn post image: **1200 × 627 px**, landscape, as requested by CAIA. Design a separate composition rather than cropping the Instagram post.
- Optional only when requested: Instagram 1080 × 1440 (3:4), square 1080 × 1080, Story 1080 × 1920. The exporter supports these sizes; the provided template has dedicated layouts only for the two defaults. Recompose the others.
- Deliver editable HTML/CSS/SVG, images, a short caption with the actual Luma link, descriptive alt text, and a QA report. The HTML is the editable master. PNG is the default upload artifact.

## Event information

Get the event title, type, speaker and affiliation if relevant, date including year, weekday, start/end time and timezone, building/room or online location, exact Luma URL, admission/access restrictions, and confirmed food provision from the user's brief. Check date/weekday agreement. Ask only for missing information that affects a final post. Do not infer free admission, an affiliation, a room, or catering.

An event image should contain the CAIA wordmark, clear title, date, time, location, one call to action, and a real QR code. Include **“Food will be provided.”** when confirmed. If food is unknown, ask or omit it in a draft. For non-event research/news posts, do not invent event logistics or force a Luma QR onto unrelated content.

The starter uses `dateISO`, `startTime`, `endTime`, and IANA `timeZone` to generate the weekday, year, and time label. Declare `linkType: "event"` or `"calendar"` and an explicit boolean `sample`. `food` is optional and omitted when absent. See the input schema in the export guide. No code can verify that a room is booked or catering is confirmed; check those facts against the brief.

Use `titleLines` for deliberate headline line breaks: its strings must join to the unchanged title, allowing whitespace normalization. Use `focusText` for the final headline word emphasized by the ellipse; it must match the end of the last title line, including any chosen punctuation. The renderer has no `illustration` input or standalone image slot; any older schema guidance describing one is superseded.

Link the QR to the **specific event** on Luma. Use `https://luma.com/cornellaia` only for a general calendar invitation or an explicitly labeled sample. Label a calendar QR “Explore events on Luma,” never “RSVP to this event.” A test event must visibly say **“Design study / Not a real event”**, use `sample: true`, and have a caption explaining the dates/location are fictional. Do not publish or send posts unless explicitly requested.

## Essential style constraints

- Use bundled **Young Serif regular** for the main headline. Use bundled **Inter** for details, body text, labels, and calls to action. Do not use Myriad Pro, synthetic bold on Young Serif, or widely tracked all-caps headings.
- White canvas with a subtle square grid that remains visible in the phone-sized export. Main text `#0F172A`, supporting text `#334155`, action red `#B31B1B`, pale borders `#E2E8F0`. Aqua illustration palette and exact tokens live in `assets/tokens.css`.
- One main message, one illustrative idea, one CTA. Do not make every detail a rounded card. Keep critical information large enough to read at phone size. Shorten copy or move explanation to the caption instead of shrinking it.
- Use the supplied wordmark without recoloring, distortion, cropping, or rebuilding its letters. Keep clear space around it.
- Design custom, topic-relevant SVG geometry within the poster's shared coordinate system. Measure text after fonts load, anchor paths and rules to those measurements, and protect text and QR with masks/exclusion zones. Do not insert decorative artwork through `img src`, a CSS background image, or a separate art row/box.
- Choose headline scale, line breaks, and spacing relationships for the actual copy and format. Previous type-size ranges and headline line-count limits are not caps. Judge hierarchy and readability in the rendered composition.
- QR codes are functional, never decorative. Generate them deterministically with the script/library, keep square modules and a four-module white quiet zone, and verify the **rendered image**. Never draw or AI-generate a QR pattern.

## Workflow

1. Read the brief. Separate confirmed facts from sample content. Choose format(s), a short title, and the one thing a viewer should remember.
2. Read both composition references. Use `assets/tokens.css`. Establish headline emphasis, readable logistics, alignment anchors, and spacing relationships before drawing custom geometry. Compose each requested aspect ratio independently.
3. Bootstrap a local event brief from `examples/test-event/brief.json`. The commands below scaffold and export; generated layouts still require design work. The starter direction is an inline SVG overlay with an ellipse integrated around the final headline word and a path that becomes a layout divider. Headline and metadata remain HTML; decorative `img src` artwork is not part of this approach. Follow the measurement, anchoring, and masking recipe in `references/svg-composition.md` when adapting the source.
4. Wait for the bundled fonts, measure actual text, then refine type, gaps, SVG anchors, and exclusion zones together. Recompute geometry after copy, font, spacing, or format changes. Export the customized HTML directly; regenerating it can overwrite edits.
5. Inspect native images and 432px previews for hierarchy, optical spacing, meaningful geometry, and format-specific balance. Compare revisions and record concrete visual findings. Passing export tests does not mean good design; fix visual weaknesses even when all checks pass.
6. Verify facts, dimensions, logo, QR destination, quiet zone, and mobile legibility. Include the link as text in the caption. Supply source + final images + caption/alt text + QA notes, distinguishing automated checks from actual visual review and unresolved issues.

```sh
# Run inside this folder. Requires Node 20+ and npm.
npm ci
npx playwright install chromium
npm run render -- examples/test-event/brief.json dist/my-event
npm run export -- dist/my-event/instagram.html
npm run export -- dist/my-event/linkedin.html
```

Open [the canonical preview](examples/test-event/preview.html) and its editable [Instagram](examples/test-event/instagram.html) and [LinkedIn](examples/test-event/linkedin.html) sources. Their shared composition sources are [poster.css](templates/poster.css) and [compose.js](templates/compose.js). Adapt the typography and geometry to each brief and review each export; the examples do not establish user approval or replace visual judgment.

For sharing this kit, run `npm run pack` and send `dist/caia-social-design.zip`, or send the folder without `node_modules`, browser caches, and `dist`. Keep font licenses with the fonts. Agents receiving the folder should read `SKILL.md` (the standard skill filename, also accessible as `skill.md` on case-insensitive systems).

# Export and handoff

## Reproducible setup

Run inside the **design folder**, not the website's app:

```sh
npm ci
npx playwright install chromium
npm run example
```

Requires Node 20+, npm, and an installed Chromium browser. The first install requires internet. Afterwards rendering uses only local fonts/assets and blocks external network requests. On Linux, if browser system libraries are missing, follow Playwright's `npx playwright install --with-deps chromium` instructions. If a compatible local Chrome is already installed, use `DESIGN_BROWSER_CHANNEL=chrome npm run export -- path/to/post.html` instead. Do not embed a machine-specific browser path in the kit.

Run `node --version` first. Scripts explicitly reject older Node versions. For an isolated environment, install and export with the same `PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers` variable; this keeps the browser in a local ignored directory. The packer excludes that directory and `.npm-cache`.

Create a copy of `examples/test-event/brief.json`, replace its facts, set `sample` to false only for a real, verified event, then:

```sh
npm run render -- path/to/brief.json dist/event-name
npm run export -- dist/event-name/instagram.html
npm run export -- dist/event-name/linkedin.html
```

The renderer's event schema:

| Field | Meaning |
|---|---|
| `title`, `summary`, `location`, `cta` | Confirmed display strings; no mandatory event-type eyebrow |
| `dateISO` | Real calendar date, `YYYY-MM-DD`; weekday and year generated |
| `startTime`, `endTime` | Local 24-hour `HH:MM`; end after start, same day |
| `timeZone` | IANA zone such as `America/New_York` |
| `timeZoneLabel` | Optional display label for zones without a built-in US/UTC abbreviation |
| `date`, `time` | Optional display assertions; if supplied they must exactly match generated labels |
| `lumaUrl` | Confirmed HTTPS Luma destination |
| `linkType` | `event` or `calendar`; calendar CTAs cannot say RSVP/register |
| `sample` | Required boolean; true samples must use a calendar destination |
| `food` | Optional confirmed wording; null/absent/empty omits the paragraph |
| `shortUrl` | Optional visible URL, naming the same destination as `lumaUrl` |
| `titleLines` | Optional array of unchanged title fragments, split for meaning; joined text must equal title |
| `focusText` | Optional terminal phrase to anchor this example's inspection geometry; must end the last title line |

US zone labels use ET/CT/MT/PT to avoid falsely fixing daylight-saving offsets. For overnight or multi-day events, create an appropriate custom layout and verify the complete schedule manually. Admission/access restrictions, speakers and affiliations belong in custom fields/markup when the brief calls for them; never manufacture those facts to fill a template.

Rendering regenerates HTML and replaces edits to it. For one-off customization, edit generated HTML and export it directly. To keep an evolved design, copy its source into an event-specific folder and preserve its relative asset paths. All source/assets for export must be inside this kit. Do not point assets back into `cornellaia/` or the author's home directory.

For repeatable bespoke layouts, pass an event-local template as a third argument: `npm run render -- brief.json dist/event-name examples/my-event/template.html`. Keep the same `{{field}}` placeholders as `templates/event.html`, including `{{foodBlock}}` for optional food, `{{qr}}`, `{{assets}}`, and `{{sample}}`. The output remains `instagram.html` and `linkedin.html` using `data-format` styles. Use `{{assets}}` instead of hardcoded relative paths inside templates that may render to a different folder.

The current example is split into `templates/event.html` (content), `templates/poster.css` (type and layout), and `templates/compose.js` (custom SVG geometry). `{{titleMarkup}}` inserts the controlled title lines and focus span, `{{weekday}}` and `{{calendarDate}}` let the layout group date information, and `{{posterCss}}` / `{{compositionScript}}` resolve the bundled composition files. For a different visual concept, create event-local CSS and geometry code and update the custom template references. The lens is specific to the question in this example, not a required motif for every event. The old `illustration` image-slot input is deliberately rejected.

## Export contract

HTML must include one `.post` at exact dimensions and a `data-format` attribute. For event posts, include `data-qr-url` with the exact destination and one `.qr` containing the QR. For non-event content without a QR, omit both. Mark independent groups of essential content with `data-critical`. Import `assets/tokens.css` with an appropriate relative path.

The script starts a local temporary HTTP server on an available port, renders with device scale factor 1, waits for fonts, images, and an optional `window.compositionReady` promise for text-anchored SVG, checks text-group bounds/overlap/overflow, checks canvas size and loaded fonts, and decodes the rendered QR. It closes the browser and server afterwards.

It exports beside the HTML:

- `name.png`: exact-size, opaque screenshot, preferred upload.
- `name.jpg`: high-quality JPEG alternative.
- `name-preview.png`: 432px-wide mobile-reading preview, **not** the upload file.
- `name-qa.json`: dimensions, fonts, decoded destination, reduced-size QR check, and a reminder that manual review is required.

Do not change a generated report to claim an inspection that did not occur. Record actual manual review date, formats inspected, reviewer, changes, and limitations in a separate `qa-report.md`. A visually weak design may pass every automated check. Re-review after source changes. No physical phone scan or user approval is implied by those checks.

These are browser screenshots, not a PDF-to-image conversion, so there are no print margins or DPI guesses. SVGs and fonts render in Chromium. Do not upscale screenshots or use the preview as the master.

## Acceptance checklist

1. Open both the PNG and the small preview. Can you read the topic, time, and location without zooming? Is the CTA visually secondary to the title?
2. Confirm exact pixel dimensions and expected aspect ratio. Verify no clipping, overflow, invisible fonts, broken images, awkward one-word lines, and unwanted scrollbar.
3. Inspect balance and spacing. Automated bounds checks can miss low contrast or two children colliding within the same group. Remove redundant ornaments.
4. Check every fact against the brief. Date and weekday must agree. Food, affiliation, admission, and accessibility claims must be confirmed.
5. Check QR QA output and scan with a phone when available. Ensure the destination is the event, not accidentally the calendar. A successful machine decode is evidence, not a promise about all camera/app combinations.
6. Provide caption with clickable URL and descriptive alt text. Preserve SVG/HTML source and the brief with the exports.

## Sharing

`npm run pack` creates `dist/caia-social-design.zip` without dependencies, previous ZIPs, or generated `dist` output. It includes the finished reference example. It requires the standard `zip` command; alternatively archive the folder manually with the same exclusions. The receiving agent runs `npm ci` and installs Chromium once. Do not send `node_modules`.

## Platform sources and review date

Reviewed 2026-09-22. Export sizes are design defaults and should be rechecked if a publishing workflow rejects a format.

- Instagram photo resolution: https://help.instagram.com/1631821640426723 . Direct fetch was rate-limited during kit creation. The kit deliberately uses 1080 × 1350 (4:5), rather than depending on the newest maximum ratio or a scheduling tool's support for 3:4. Optional 1080 × 1440 needs confirmation in the actual publishing workflow.
- LinkedIn's official guidance recommends 1.91:1, 1200 × 627 for shared-link previews: https://www.linkedin.com/help/linkedin/answer/a566445 . CAIA also chooses this format for its landscape post images. LinkedIn accepts other ratios for image-only posts.
- Google Fonts source and licenses: https://github.com/google/fonts/tree/main/ofl/youngserif and https://github.com/google/fonts/tree/main/ofl/inter . Bundled SIL Open Font Licenses accompany the downloaded font files.

Nothing in the export workflow uploads to Instagram, LinkedIn, or Luma.

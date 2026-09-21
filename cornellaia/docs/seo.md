# Search metadata and indexing

The canonical production origin is `https://www.cornell-aia.org`. The bare domain redirects there on the live site. `VERCEL_URL` is deliberately ignored, so deploying a branch cannot replace production canonical URLs.

`NEXT_PUBLIC_SITE_URL` is an optional override for a future domain change. On production, leave it unset or set it to `https://www.cornell-aia.org`. Check that an older deployment setting does not still point to a Vercel hostname. Metadata and the sitemap are generated at build time, so rebuild after changing this setting.

## Implemented

- Unique branded titles and descriptions for the eight main pages, with absolute canonical, Open Graph, and Twitter URLs.
- `/sitemap.xml` derives its canonical page list from `NAV_ITEMS`. Redirects and the unindexed course poster are excluded. Modification dates are omitted because there is no reliable source for them.
- `/robots.txt` advertises the production sitemap. Vercel previews use `noindex, nofollow` metadata and an empty sitemap. Their robots rules still permit crawling so search engines can read the noindex directive. Preview detection uses `VERCEL_ENV=preview`.
- Organization and WebSite JSON-LD describe CAIA. Course JSON-LD describes CS 1998, with the lead instructor attached to its Fall 2026 course instance. JSON is escaped before embedding in HTML.
- The animated homepage headline is complete in server-rendered HTML. Its animation is hidden from assistive technology, while the full text reserves layout space. Reveal sections are readable without JavaScript.
- Permanent redirects preserve older links: `/programs` to `/join#programs`, `/get-involved` to `/join`, and `/cs1998` to `/programs/cs1998`. The existing `/updates` redirect to `/events` is retained.

Use `createPageMetadata` for new pages. Add new public pages to the sitemap when appropriate, and use accurate titles and descriptions that reflect visible content. Keep structured data factual, without inventing ratings, dates, affiliations, or credentials.

## Verification

Requires Node.js 20.9 or newer for Next.js. This change was built with Node 24.

```sh
node scripts/check-seo.cjs
npx tsc --noEmit
npm run build -- --webpack
```

The regression check covers origin normalization, branded titles, canonical and social metadata, sitemap membership, and preview behavior. A production browser check also verified all eight routes, server-rendered headings, parseable JSON-LD, redirects, robots, sitemap, poster noindex, desktop/mobile layout, and hydration without page errors.

## After deployment

1. Confirm the live canonical tags, `/robots.txt`, and `/sitemap.xml` use the production domain.
2. Verify the domain in Google Search Console and submit `https://www.cornell-aia.org/sitemap.xml`.
3. Inspect the home, resources, research, and course URLs in Search Console. Use the Rich Results Test to inspect applicable structured data.
4. Monitor indexing and real-user Core Web Vitals. This work does not establish ranking improvements or field performance scores.

No Search Console submission or production deployment was performed as part of this change.

References: [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld).

# Library curriculum coverage

Reviewed on September 20, 2026. All eight supplied curricula were read, including core, optional, supplementary, further and deprecated-but-recommended readings. The review also covers explicitly assigned notebooks, models, datasets, tools, career guides and opportunities.

The Library now contains **572 resources**, including **508 distinct resources from these curricula**. The previous 79 entries are preserved or merged with equivalent source references. Eight recent resources were added separately. The link audit replaced 15 destinations and excluded one unavailable article.

## Sources

| Curriculum | Resources represented |
| --- | ---: |
| [Technical AI Safety Fellowship Syllabus - Spring 2026](https://docs.google.com/document/d/13-VaesTkJrV2havIRq-G4xMePTfKUGnLiBvZb7oP0cI) | 121 |
| [Policy Fellowship Syllabus - Spring 2026](https://docs.google.com/document/d/1xkCS0FQgnhS2luy48YZAUtM2FfcOa3bhtBDXZKAgU7E) | 45 |
| [AISST Policy Fellowship Spring 2026 Syllabus [Shared]](https://docs.google.com/document/d/1H-wORixmZyrykfHswXb9afPgupIdIFa3bkADHWop99s) | 86 |
| [8 week curriculum for Fall 2025](https://docs.google.com/document/d/1LjO_LaMoFURQhqcZWpKHipXqASD57Sd4ExNkibgOca8) | 81 |
| [CASI Alignment Reading Group S26](https://docs.google.com/document/d/11hSVDwhiRjqONF5kGo661CZMaCo-zZzmYqql3JbJllg) | 145 |
| [CASI Alignment Reading Group F25](https://docs.google.com/document/d/1Wq5SRwbvHy-ZAZg3EpSgpBErPRoOn5Ne5iJtEExGynw) | 124 |
| [CAIAC Technical Fellowship Curriculum](https://docs.google.com/document/d/1gDIPzQ6b8LcJhfrag_Gy9ca6ziB4fYfKu-zMR6qYeiE) | 93 |
| [CAIAC Policy & Governance Fellowship Curriculum](https://docs.google.com/document/d/14gOLPczbGpESK2iae1dii0aVCAMIKnCb4pIp6bLkaeg) | 60 |

Counts overlap because curricula share readings.

## Coverage and deduplication

- Reviewed 1,582 nonempty paragraphs and 795 merged link occurrences, initially grouped into 527 unique URL records.
- Checked all structured hyperlinks, including rich-link chips, tables, suggested links and image links. Recovered the Harvard Weaponized AI article and added the missing source attribution for METR’s long-task evaluation article.
- Added Featherless AI, an explicitly assigned exercise tool mentioned without a hyperlink.
- Every initial URL record has an included destination or an explicit exclusion in [source-audit.json](./source-audit.json). Resource source numbers refer to the ordered source list in that file.
- Combined alternate arXiv links, tracking URLs, confirmed redirects and verified cross-posts. Kept papers and their separate research overviews as distinct entries.
- Kept the existing folder and list views. The imported entries have explicit topic folders, format labels and searchable titles.

## Exclusions

Nine source records are excluded: eight administrative/incidental links and one unavailable article:

| Reference | Reason |
| --- | --- |
| 1 | Personal website linked solely as a curriculum author credit |
| 2 | Personal website linked solely as a curriculum author credit |
| 3 | Personal website linked solely as a curriculum author credit |
| 115 | Local course career-advising meeting scheduling document |
| 165 | The assigned OpenAI infrastructure article now redirects to a generic compliance portal. No verified public copy was found. |
| 236 | Course feedback form |
| 326 | Course attendance form |
| 473 | Course feedback and one-to-one meeting scheduling form. |
| 522 | Course feedback and one-to-one meeting scheduling form. |

Unlinked discussion questions, topic headings, author biographies and incidental mentions were not invented as separate resources. Linked collections are included as collections, without recursively importing every page they link to.

## Access notes

Final counts: **531 http-ok**, **39 access-blocked**, **1 http-other**, **1 rate-limited**. Of the access-blocked entries, 14 have separate web verification. See the [compact audit report](./link-audit.md) for unresolved cases.

Reference 240 returned HTTP 410 and was replaced with the explicitly identified **80,000 Hours Career Planning Template**. Its provider page and downloadable Google Doc were verified without login. The unavailable original is no longer displayed.

The URL audit covers all **573 pre-repair resources (565 original + eight recent)** and all **572 final resources**. See [link-audit.json](./link-audit.json) for every URL, status, redirect, timestamp and retry, including superseded or excluded URLs. [link-audit-changes.json](./link-audit-changes.json) explains all 15 replacements and the exclusion; [link-audit-review.json](./link-audit-review.json) records additional document exports, YouTube checks, browser reviews and the main agent’s OpenAI verification.

The initial anonymous GET sweep used one request at a time per host, at most ten globally, one-second host cooldowns (three seconds for arXiv), 35-second timeouts and one retry for transient errors. Large responses were checked with partial-content requests. HTTP 403/406/429 responses and browser challenges are not proof that a resource is dead. HTTP 200 alone does not establish useful content: Google permissions, client-side redirects, obvious error pages and suspicious titles were reviewed separately.

All eight remaining Google Docs exported text anonymously; the replacement template did too. All 29 individual YouTube videos exposed public oEmbed metadata (the playlist and channel were checked as pages). Both Colab notebooks exposed notebook content anonymously. The Notion career guide and Miro blueprint rendered publicly in a browser without login. Twelve OpenAI destinations were independently checked by the main agent using the web tool, despite local curl bot blocks. The NLA primary page returned 200 and remains included.

Access remains uncertain where publishers reject automation. This is a point-in-time URL/usability audit, not a guarantee of unrestricted full text, video playback in every region, current fellowship applications, or the validity of every nested link. No paper was removed merely because a publisher blocked a bot.

Illustrations without a linked resource or identifiable reading title were not treated as reading lists. Source provenance recovered from an image link and a sequence-chapter link is recorded explicitly in the audit.

## Verification

Run `node cornellaia/scripts/check-library.cjs` from the repository root. It verifies that every included source reference reaches the live Library data, every excluded reference has a reason, all eight sources are represented, canonical URLs are unique, all entries belong to folders, visible punctuation follows the site style, and search and format filters work.

To repeat the network check, run `node docs/library/link-audit.cjs --refresh`. Without `--refresh`, the script resumes from saved per-URL results and checks new destinations. Inspect flagged results before editing content; the script never deletes library resources. Review annotations and this summary are dated evidence and should be reconciled after a fresh scan.

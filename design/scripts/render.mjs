import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (Number(process.versions.node.split('.')[0]) < 20) throw new Error('Use Node 20 or newer before rendering this kit.');
const [input, destination = 'dist/post', customTemplate] = process.argv.slice(2);
if (!input) throw new Error('Usage: npm run render -- brief.json output-directory [event-template.html]');
const brief = JSON.parse(await fs.readFile(path.resolve(input), 'utf8'));
if ('illustration' in brief) throw new Error('The detached illustration slot was removed. Compose custom inline SVG with the typography in an event-local template instead.');
if (brief.focusText != null && typeof brief.focusText !== 'string') throw new Error('focusText must be a title substring.');
for (const key of ['title', 'summary', 'location', 'lumaUrl', 'cta', 'dateISO', 'startTime', 'endTime', 'timeZone']) {
  if (typeof brief[key] !== 'string' || !brief[key].trim()) throw new Error(`Supply confirmed ${key}. For a mockup, explicitly set sample: true and use fictional details.`);
}
if (typeof brief.sample !== 'boolean') throw new Error('Set sample explicitly to true for a fictional design study or false for a confirmed event.');
if (brief.food != null && typeof brief.food !== 'string') throw new Error('food must be confirmed text or null/omitted.');
const day = new Date(`${brief.dateISO}T12:00:00Z`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(brief.dateISO) || !Number.isFinite(day.getTime()) || day.toISOString().slice(0,10) !== brief.dateISO) throw new Error('dateISO must be a real calendar date in YYYY-MM-DD format.');
const minutes = s => {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(s)) throw new Error('Use 24-hour HH:MM for startTime and endTime.');
  const [h,m] = s.split(':').map(Number); return h*60+m;
};
if (minutes(brief.endTime) <= minutes(brief.startTime)) throw new Error('The starter supports same-day events with endTime after startTime. Use a custom layout for overnight or multi-day events.');
new Intl.DateTimeFormat('en-US',{timeZone:brief.timeZone}); // Reject invalid IANA identifiers.
const zoneLabels = {'America/New_York':'ET','America/Chicago':'CT','America/Denver':'MT','America/Los_Angeles':'PT','UTC':'UTC'};
const zoneLabel = zoneLabels[brief.timeZone] || brief.timeZoneLabel || brief.timeZone;
const clock = s => { const [h,m] = s.split(':').map(Number); return `${h%12 || 12}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`; };
let start = clock(brief.startTime); const end = clock(brief.endTime);
if (start.slice(-2) === end.slice(-2)) start = start.slice(0,-3);
const date = new Intl.DateTimeFormat('en-US',{timeZone:'UTC',weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(day);
const time = `${start}–${end} ${zoneLabel}`;
if (brief.date && brief.date !== date) throw new Error(`date disagrees with dateISO. Expected: ${date}`);
if (brief.time && brief.time !== time) throw new Error(`time disagrees with structured times. Expected: ${time}`);
Object.assign(brief,{date,time});
const url = new URL(brief.lumaUrl);
if (url.protocol !== 'https:' || !['luma.com', 'lu.ma', 'www.luma.com'].includes(url.hostname)) throw new Error('lumaUrl must be an HTTPS Luma URL.');
if (!['event','calendar'].includes(brief.linkType)) throw new Error('Declare linkType as event or calendar.');
const isCaiaCalendar = url.pathname.replace(/\/$/,'') === '/cornellaia';
if (isCaiaCalendar && brief.linkType !== 'calendar') throw new Error('The CAIA calendar URL must use linkType: calendar.');
if (brief.linkType === 'calendar' && /\brsvp\b|register|reserve|sign up/i.test(brief.cta)) throw new Error('A calendar CTA must invite exploration, not imply registration for this event.');
if (brief.sample && brief.linkType !== 'calendar') throw new Error('Use the real calendar, not a fictional event registration URL, for sample designs.');
const output = path.resolve(destination);
await fs.mkdir(output, { recursive: true });
const rel = p => path.relative(output, p).split(path.sep).join('/');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const lines = brief.titleLines || [brief.title];
if (!Array.isArray(lines) || !lines.length || lines.some(line => typeof line !== 'string') || lines.join(' ').replace(/\s+/g,' ').trim() !== brief.title.replace(/\s+/g,' ').trim()) throw new Error('titleLines must contain the unchanged title, split at meaningful boundaries.');
if (brief.focusText && !lines.at(-1).endsWith(brief.focusText)) throw new Error('focusText must match the end of the last title line for this example composition.');
const titleMarkup = lines.map((line,i) => {
  const text = brief.focusText && i===lines.length-1 ? esc(line.slice(0,-brief.focusText.length)) + `<span class="focus-word">${esc(brief.focusText)}</span>` : esc(line);
  return `<span class="title-line">${text}</span>`;
}).join('');
const qr = await QRCode.toString(brief.lumaUrl, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: {dark: '#0f172a', light: '#ffffff'} });
const template = await fs.readFile(customTemplate ? path.resolve(customTemplate) : path.join(root, 'templates/event.html'), 'utf8');
for (const format of ['instagram', 'linkedin']) {
  const values = Object.fromEntries(Object.entries(brief).map(([k,v]) => [k, esc(v)]));
  Object.assign(values, {
    format, assets: esc(rel(path.join(root, 'assets'))), qr, titleMarkup,
    posterCss: esc(rel(path.join(root,'templates/poster.css'))),
    compositionScript: esc(rel(path.join(root,'templates/compose.js'))),
    weekday: esc(new Intl.DateTimeFormat('en-US',{timeZone:'UTC',weekday:'long'}).format(day)),
    calendarDate: esc(new Intl.DateTimeFormat('en-US',{timeZone:'UTC',month:'long',day:'numeric',year:'numeric'}).format(day)),
    foodBlock: brief.food?.trim() ? `<p class="food">${esc(brief.food)}</p>` : '',
    shortUrl: esc(brief.shortUrl || brief.lumaUrl.replace(/^https:\/\//, '')),
    sample: brief.sample === true ? '<span class="sample" data-critical data-ink>Design study<br>Not a real event</span>' : ''
  });
  const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Unknown template field ${key}`);
    return values[key];
  });
  await fs.writeFile(path.join(output, `${format}.html`), html);
  console.log(`Created ${path.join(output, `${format}.html`)}`);
}

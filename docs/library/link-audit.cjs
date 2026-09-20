// Run: node docs/library/link-audit.cjs [--refresh]
// Anonymous GETs; one request per host, <= 10 globally, >= 1 second between
// requests per host (3 seconds for arXiv). Existing results are reused unless refreshed.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const run = promisify(execFile);
const app = path.resolve(__dirname, '../../cornellaia');
const ts = require(path.join(app, 'node_modules/typescript'));
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'caia-link-audit-'));
const output = path.join(__dirname, 'link-audit.json');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function inventory() {
  for (const name of ['content/resources', 'content/learning', 'lib/resource-url']) {
    const dest = path.join(scratch, name + '.js');
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, ts.transpileModule(fs.readFileSync(path.join(app, 'src', name + '.ts'), 'utf8'), {
      compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true }
    }).outputText);
  }
  fs.copyFileSync(path.join(app, 'src/content/curriculum-resources.json'), path.join(scratch, 'content/curriculum-resources.json'));
  return require(path.join(scratch, 'content/learning.js')).LIBRARY_RESOURCES;
}
function classify(r, body) {
  const title = (body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/\s+/g, ' ').trim();
  const flags = [];
  const visibleText = body.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  if (/accounts\.google\.com/.test(r.finalUrl) || (/docs\.google\.com/.test(r.url) && /you need (?:access|permission)|request access|sign in to continue to (?:google )?(?:docs|drive)/i.test(title + visibleText.slice(0, 25000)))) flags.push('permission-or-login');
  if (/page not found|404 not found|document does not exist|file you have requested does not exist|this (?:page|post|publication) (?:could not|couldn.t) be found|this site has been archived/i.test(title + visibleText.slice(0, 12000))) flags.push('possible-soft-404');
  if (/just a moment|attention required|access denied|captcha|security checkpoint|robot challenge|verifying your browser/i.test(title)) flags.push('bot-challenge');
  if (/bm-verify|triggerInterstitialChallenge/.test(body)) flags.push('bot-challenge');
  if (/http-equiv=["']refresh/i.test(body)) flags.push('client-redirect');
  try {
    const before = new URL(r.url), after = new URL(r.finalUrl);
    if (before.pathname.split('/').filter(Boolean).length > 1 && after.pathname.replace(/\//g, '') === '') flags.push('generic-redirect');
  } catch {}
  r.pageTitle = title.slice(0, 400);
  r.flags = flags;
  r.status = r.httpStatus === 429 ? 'rate-limited' : flags.includes('bot-challenge') || [401,403].includes(r.httpStatus) ? 'access-blocked' : r.httpStatus === 404 || r.httpStatus === 410 ? 'http-not-found' : r.httpStatus >= 500 ? 'server-error' : !r.httpStatus || r.transportError ? 'transport-error' : flags.length ? 'needs-review' : r.httpStatus >= 200 && r.httpStatus < 300 ? 'http-ok' : 'http-other';
}
async function check(item, index) {
  const bodyFile = path.join(scratch, `body-${index}`);
  const attempts = [];
  let r, body = '';
  for (let attempt = 0; attempt < 2; attempt++) {
    let stdout = '', error = '';
    try {
      ({ stdout } = await run('curl', ['--globoff', '-L', '-sS', '--compressed', '--connect-timeout', '12', '--max-time', '35', '--max-redirs', '10', '--max-filesize', '6000000', '-A', 'Mozilla/5.0 (compatible; CAIA-Library-LinkAudit/1.0)', '-o', bodyFile, '-w', '%{json}', item.href], { maxBuffer: 1024 * 1024 }));
    } catch (e) { stdout = e.stdout || ''; error = (e.stderr || e.message).slice(0, 500); }
    let meta = {};
    try { meta = JSON.parse(stdout); } catch {}
    let bodyLimited = false;
    if ([56, 63].includes(meta.exitcode) && meta.http_code === 200 && /file size/i.test(error)) {
      attempts.push({ httpStatus: 200, status: 'size-cap', checkedAt: new Date().toISOString(), error });
      await sleep(1000);
      try {
        ({ stdout } = await run('curl', ['--globoff', '-L', '-sS', '--compressed', '--connect-timeout', '12', '--max-time', '35', '--range', '0-262143', '-A', 'Mozilla/5.0 (compatible; CAIA-Library-LinkAudit/1.0)', '-o', bodyFile, '-w', '%{json}', item.href], { maxBuffer: 1024 * 1024 }));
        meta = JSON.parse(stdout); error = ''; bodyLimited = true;
      } catch (e) { error = (e.stderr || e.message).slice(0, 500); }
    }
    body = fs.existsSync(bodyFile) ? fs.readFileSync(bodyFile, 'utf8') : '';
    r = { url: item.href, title: item.title, sources: item.sources || [], checkedAt: new Date().toISOString(), httpStatus: meta.http_code || 0, finalUrl: meta.url_effective || item.href, contentType: meta.content_type || '', redirects: meta.num_redirects || 0, bytes: meta.size_download || 0, transportError: error || undefined };
    if (bodyLimited) r.bodyLimited = true;
    classify(r, body);
    attempts.push({ httpStatus: r.httpStatus, status: r.status, checkedAt: r.checkedAt, error: r.transportError });
    if (attempt || !['rate-limited', 'server-error', 'transport-error'].includes(r.status)) break;
    await sleep(r.status === 'rate-limited' ? 15000 : 4000);
  }
  r.attempts = attempts;
  if (r.status !== 'http-ok') fs.writeFileSync(path.join(scratch, `review-${index}.txt`), body.slice(0, 500000));
  fs.rmSync(bodyFile, { force: true });
  return r;
}
(async () => {
  const resources = inventory();
  fs.writeFileSync(path.join(scratch, 'inventory.json'), JSON.stringify(resources, null, 2) + '\n');
  let previous = [], supersededResults = [];
  if (fs.existsSync(output)) supersededResults = JSON.parse(fs.readFileSync(output)).supersededResults || [];
  if (!process.argv.includes('--refresh') && fs.existsSync(output)) previous = JSON.parse(fs.readFileSync(output)).results;
  const urls = new Set(resources.map(r => r.href));
  supersededResults = [...new Map([...supersededResults, ...previous.filter(r => !urls.has(r.url))].map(r => [r.url, r])).values()];
  const cache = new Map(previous.map(r => [r.url, r]));
  const results = resources.filter(r => cache.has(r.href)).map(r => ({...cache.get(r.href), title: r.title, sources: r.sources || []}));
  const pending = resources.map((item,index) => ({item,index,host:new URL(item.href).hostname.replace(/^www\./,'')})).filter(x => !cache.has(x.item.href));
  const active = new Map(), ready = new Map();
  const startedAt = new Date().toISOString();
  function save() {
    const counts = {};
    for (const r of results) counts[r.status] = (counts[r.status] || 0) + 1;
    fs.writeFileSync(output, JSON.stringify({ startedAt, updatedAt: new Date().toISOString(), inventoryCount: resources.length, checkedCount: results.length, counts, supersededResults, method: 'Anonymous curl GET with redirects, 35s timeout, one active request per host, 10 global workers, 1s host cooldown (arXiv 3s), one retry for transient errors; HTTP success is not a guarantee of full text or semantic correctness.', reviewBodiesDirectory: scratch, results: [...results].sort((a,b) => a.title.localeCompare(b.title)) }, null, 2) + '\n');
  }
  console.log(`Auditing ${resources.length} resources; ${results.length} cached. Review bodies: ${scratch}`);
  while (pending.length || active.size) {
    for (let i = 0; i < pending.length && active.size < 10;) {
      const job = pending[i];
      if (active.has(job.host) || (ready.get(job.host) || 0) > Date.now()) { i++; continue; }
      pending.splice(i, 1);
      active.set(job.host, check(job.item, job.index).then(r => {
        results.push(r); active.delete(job.host); ready.set(job.host, Date.now() + (job.host === 'arxiv.org' ? 3000 : 1000)); save();
        if (results.length % 25 === 0 || r.status !== 'http-ok') console.log(`${results.length}/${resources.length} ${r.status} ${r.httpStatus} ${r.title}`);
      }));
    }
    await sleep(100);
  }
  save();
  console.log(fs.readFileSync(output, 'utf8').slice(0, 700));
})().catch(e => { console.error(e); process.exitCode = 1; });

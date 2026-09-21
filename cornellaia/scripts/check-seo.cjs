// Run with: node scripts/check-seo.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const ts = require('typescript');
const app = path.resolve(__dirname, '..');
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'caia-seo-check-'));
const envKeys = ['NEXT_PUBLIC_SITE_URL', 'VERCEL_URL', 'VERCEL_ENV'];
const saved = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
try {
  for (const name of ['content/seo', 'content/navigation', 'app/sitemap', 'app/robots']) {
    const source = path.join(app, 'src', `${name}.ts`);
    assert(fs.existsSync(source), `Missing ${name}`);
    const target = path.join(scratch, `${name}.js`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, ts.transpileModule(fs.readFileSync(source, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText);
  }
  function load(env = {}) {
    for (const key of envKeys) { delete process.env[key]; if (env[key] !== undefined) process.env[key] = env[key]; }
    for (const name of ['content/seo', 'app/sitemap', 'app/robots']) delete require.cache[require.resolve(path.join(scratch, `${name}.js`))];
    return { ...require(path.join(scratch, 'content/seo.js')), sitemap: require(path.join(scratch, 'app/sitemap.js')).default(), robots: require(path.join(scratch, 'app/robots.js')).default() };
  }
  const prod = load({ VERCEL_URL: 'temporary-branch.vercel.app' });
  assert.equal(prod.SITE_URL, 'https://www.cornell-aia.org');
  assert.equal(prod.sitemap.length, 8);
  assert.equal(new Set(prod.sitemap.map(item => item.url)).size, 8);
  assert(prod.sitemap.every(item => item.url.startsWith(prod.SITE_URL) && !item.lastModified));
  assert(!prod.sitemap.some(item => /poster|updates|get-involved/.test(item.url)));
  assert.equal(prod.robots.sitemap, `${prod.SITE_URL}/sitemap.xml`);
  const metadata = prod.createPageMetadata({ title: 'Resources', description: 'AI safety resources.', path: '/resources' });
  assert.deepEqual(metadata.title, { absolute: 'Resources | Cornell AI Alignment' });
  assert.equal(metadata.alternates.canonical, `${prod.SITE_URL}/resources`);
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  assert.equal(metadata.openGraph.locale, 'en_US');
  assert(metadata.openGraph.images[0].width > 0 && metadata.openGraph.images[0].height > 0);
  assert.equal(load({ NEXT_PUBLIC_SITE_URL: 'cornell-aia.org/path?q=1' }).SITE_URL, prod.SITE_URL);
  assert.equal(load({ NEXT_PUBLIC_SITE_URL: 'not a url' }).SITE_URL, prod.SITE_URL);
  assert.equal(load({ NEXT_PUBLIC_SITE_URL: 'https://example.org/path/' }).SITE_URL, 'https://example.org');
  const preview = load({ VERCEL_ENV: 'preview', VERCEL_URL: 'branch.vercel.app' });
  assert.equal(preview.IS_PREVIEW, true);
  assert.equal(preview.robots.rules.allow, '/');
  assert(!preview.robots.rules.disallow);
  assert(!preview.robots.sitemap);
  assert.equal(preview.sitemap.length, 0);
  console.log('PASS: canonical production origin, URL normalization, eight sitemap pages, preview exclusion, robots and social metadata.');
} finally {
  for (const key of envKeys) { if (saved[key] === undefined) delete process.env[key]; else process.env[key] = saved[key]; }
  fs.rmSync(scratch, { recursive: true, force: true });
}

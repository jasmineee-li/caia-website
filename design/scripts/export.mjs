import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (Number(process.versions.node.split('.')[0]) < 20) throw new Error('Use Node 20 or newer before exporting this kit.');
const [input] = process.argv.slice(2);
if (!input) throw new Error('Usage: npm run export -- path/to/post.html');
const file = path.resolve(input);
const relative = path.relative(root, file);
if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Keep the HTML and its assets inside the design folder.');
await fs.access(file);
const formats = { instagram: [1080,1350], 'instagram-tall': [1080,1440], square: [1080,1080], story: [1080,1920], linkedin: [1200,627] };
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.ttf':'font/ttf', '.woff2':'font/woff2'};
const server = http.createServer(async(req,res) => {
  try {
    const name = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    const local = path.relative(root, name);
    if (local.startsWith('..') || path.isAbsolute(local)) { res.writeHead(403).end(); return; }
    const body = await fs.readFile(name);
    res.writeHead(200, {'Content-Type':types[path.extname(name)] || 'application/octet-stream'}).end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({headless:true, ...(process.env.DESIGN_BROWSER_CHANNEL ? {channel:process.env.DESIGN_BROWSER_CHANNEL} : {})});
  const page = await browser.newPage({viewport:{width:1200,height:1920}, deviceScaleFactor:1, reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', res => { if (res.status() >= 400) errors.push(`${res.status()} ${res.url()}`); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
  await page.goto(`${origin}/${relative.split(path.sep).map(encodeURIComponent).join('/')}`, {waitUntil:'networkidle'});
  await page.evaluate(async() => {
    await Promise.all([document.fonts.load('400 32px "Young Serif"'), document.fonts.load('400 32px "Inter"'), document.fonts.load('600 32px "Inter"')]);
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode()));
    if (window.compositionReady) await window.compositionReady;
  });
  const post = page.locator('.post');
  const format = await post.getAttribute('data-format');
  const dimensions = formats[format];
  if (!dimensions) throw new Error('Set .post[data-format] to instagram, instagram-tall, square, story, or linkedin.');
  await page.setViewportSize({width:dimensions[0],height:dimensions[1]});
  const qa = await post.evaluate(el => {
    const r = el.getBoundingClientRect();
    const issues = [];
    const items = [...el.querySelectorAll('[data-critical]')];
    if (!items.length) issues.push('Mark essential content with data-critical.');
    for (const item of items) {
      const b = item.getBoundingClientRect();
      if (b.left < r.left || b.top < r.top || b.right > r.right + 1 || b.bottom > r.bottom + 1) issues.push(`Out of canvas: ${item.className}`);
      for (const child of [item, ...item.querySelectorAll('*')]) {
        if (getComputedStyle(child).display === 'none') continue;
        const c = child.getBoundingClientRect();
        if (c.right > r.right+1 || c.bottom > r.bottom+1 || c.left < r.left-1 || c.top < r.top-1) issues.push(`Child out of canvas: ${child.className}`);
        if (child.clientWidth && child.scrollWidth > child.clientWidth + 2) issues.push(`Horizontal overflow: ${child.className}`);
        // Serif glyphs may extend outside a tight line box without being clipped.
        if (child.clientHeight && child.scrollHeight > child.clientHeight + 2 && getComputedStyle(child).overflowY !== 'visible') issues.push(`Vertical clipping: ${child.className || child.tagName}`);
      }
    }
    for (let i=0;i<items.length;i++) for (let j=i+1;j<items.length;j++) {
      if (items[i].contains(items[j]) || items[j].contains(items[i])) continue;
      const a=items[i].getBoundingClientRect(), b=items[j].getBoundingClientRect();
      if (Math.min(a.right,b.right)-Math.max(a.left,b.left)>2 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2) issues.push(`Content overlap: ${items[i].className} / ${items[j].className}`);
    }
    const fonts=[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family.replaceAll('"',''));
    for(const font of ['Young Serif','Inter']) if(!fonts.includes(font)) issues.push(`Font not loaded: ${font}`);
    return {width:r.width,height:r.height,issues:[...new Set(issues)],fonts:[...new Set(fonts)]};
  });
  if (qa.width !== dimensions[0] || qa.height !== dimensions[1]) errors.push(`Expected ${dimensions.join('x')}, got ${qa.width}x${qa.height}`);
  errors.push(...qa.issues);
  const qrUrl = await post.getAttribute('data-qr-url');
  const qrCount = await page.locator('.qr').count();
  let decoded;
  if (qrUrl || qrCount) {
    if (!qrUrl || qrCount !== 1) throw new Error('A QR post needs one .qr and data-qr-url with the exact destination.');
    // Decode the rendered QR region, not just its source SVG.
    const qrPng = PNG.sync.read(await page.locator('.qr').screenshot());
    decoded = jsQR(new Uint8ClampedArray(qrPng.data), qrPng.width, qrPng.height);
    if (decoded?.data !== qrUrl) errors.push(`Rendered QR failed to decode to ${qrUrl}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  const base = file.replace(/\.html?$/i,'');
  await post.screenshot({path:`${base}.png`,type:'png'});
  await post.screenshot({path:`${base}.jpg`,type:'jpeg',quality:95});
  const scale = 432/dimensions[0];
  await page.evaluate(scale => document.querySelector('.post').style.zoom=String(scale),scale);
  await post.screenshot({path:`${base}-preview.png`,type:'png'});
  let previewPass = null;
  if (qrCount) {
    const previewQr = PNG.sync.read(await page.locator('.qr').screenshot());
    const previewDecoded = jsQR(new Uint8ClampedArray(previewQr.data),previewQr.width,previewQr.height);
    previewPass = previewDecoded?.data === qrUrl;
  }
  const report = {format,width:qa.width,height:qa.height,fonts:qa.fonts,qrDestination:decoded?.data ?? null,qrAt432pxPreview:previewPass,layoutChecks:'passed',manualVisualReview:'required',source:path.basename(file)};
  await fs.writeFile(`${base}-qa.json`,JSON.stringify(report,null,2)+'\n');
  console.log(`Exported ${base}.png and .jpg (${dimensions.join(' × ')}), preview and QA report.`);
  if(report.qrAt432pxPreview === false) console.warn('QR does not decode at 432px preview width. Enlarge it if possible. Retest with a phone and keep a clickable link in the caption.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

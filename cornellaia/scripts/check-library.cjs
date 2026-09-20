// Run from any directory with: node cornellaia/scripts/check-library.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");
const app = path.resolve(__dirname, "..");
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "caia-library-check-"));

try {
  for (const name of ["content/resources", "content/learning", "lib/library", "lib/resource-url"]) {
    const file = path.join(scratch, `${name}.js`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, ts.transpileModule(fs.readFileSync(path.join(app, "src", `${name}.ts`), "utf8"), {
      compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText);
  }
  fs.copyFileSync(path.join(app, "src/content/curriculum-resources.json"), path.join(scratch, "content/curriculum-resources.json"));
  const { LIBRARY_RESOURCES: resources } = require(path.join(scratch, "content/learning"));
  const { LIBRARY_FOLDERS: folders, locationFor, searchLibrary } = require(path.join(scratch, "lib/library"));
  const { resourceKey } = require(path.join(scratch, "lib/resource-url"));
  const audit = JSON.parse(fs.readFileSync(path.join(app, "../docs/library/source-audit.json"), "utf8"));
  const byKey = new Map(resources.map(item => [resourceKey(item.href), item]));

  assert.equal(byKey.size, resources.length, "Duplicate resource destinations");
  assert.equal(audit.sources.length, 8, "All eight curricula must be audited");
  assert.equal(audit.references.length, 527, "Every extracted unique link must have a disposition");
  for (const reference of audit.references) {
    if (reference.excluded) { assert(reference.reason, "Exclusions must be explained"); continue; }
    const resource = byKey.get(resourceKey(reference.href));
    assert(resource, `Missing reference ${reference.number}: ${reference.href}`);
    for (const source of reference.sources) assert(resource.sources.includes(source), `Missing source attribution for ${resource.title}`);
  }
  for (const reference of audit.unlinked) assert(byKey.has(resourceKey(reference.href)), `Missing unlinked reading ${reference.title}`);
  for (const source of audit.sources) assert(resources.some(item => item.sources?.includes(source.number)), `No resources from ${source.title}`);

  for (const resource of resources) {
    assert(/^https?:$/.test(new URL(resource.href).protocol), resource.href);
    assert(resource.title.trim().length > 2, `Empty title: ${resource.href}`);
    assert(!/^(here|video|this paper|original source)$|^https?:\/\//i.test(resource.title), `Unhelpful title: ${resource.title}`);
    assert(!/[—·;]/.test(resource.title + resource.note), `Unexpected punctuation: ${resource.title}`);
    const [parent, child] = locationFor(resource);
    assert(folders.some(folder => folder.id === parent) && child, `Unfiled resource: ${resource.title}`);
  }
  for (const folder of folders) assert(resources.some(item => locationFor(item)[0] === folder.id), `Empty folder: ${folder.title}`);
  assert.equal(searchLibrary(resources, "  ", "").length, resources.length);
  assert.equal(searchLibrary(resources, "zz-no-matching-resource", "").length, 0);
  assert(searchLibrary(resources, "ELHAGE superposition", "").some(item => item.title === "Toy Models of Superposition"));
  const papers = searchLibrary(resources, "control", "Paper");
  assert(papers.length > 0 && papers.every(item => item.format === "Paper"));
  assert.equal(resourceKey("https://arxiv.org/pdf/2401.05566v2.pdf"), resourceKey("https://arxiv.org/abs/2401.05566"));
  assert.equal(resourceKey("https://www.alignmentforum.org/posts/abc/title"), resourceKey("https://www.lesswrong.com/posts/abc/another-slug"));
  console.log(`PASS: ${resources.length} unique resources, all eight curricula accounted for, every source reference reconciled.`);
  console.log(Object.fromEntries(folders.map(folder => [folder.title, resources.filter(item => locationFor(item)[0] === folder.id).length])));
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
}

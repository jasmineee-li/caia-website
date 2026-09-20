// Match alternate links to the same resource without changing the destination shown to readers.
export function resourceKey(href: string): string {
  const url = new URL(href);
  let host = url.hostname.toLowerCase().replace(/^www\./, "");
  let path = decodeURIComponent(url.pathname).replace(/\/$/, "");
  // Verified publisher redirects and cross-posts present in the curricula.
  if (host === "neelnanda.io" && path === "/mechanistic-interpretability/getting-started") return "lesswrong.com/posts/jP9KDyMkchuv6tHwm";
  if (host === "bluedot.org" && path === "/blog/what-are-probing-classifiers") return "blog.bluedot.org/p/what-are-probing-classifiers";
  if (host === "google.com" && path === "/url") {
    const target = url.searchParams.get("q") ?? url.searchParams.get("url");
    if (target) return resourceKey(target);
  }
  if (["arxiv.org", "export.arxiv.org", "alphaxiv.org"].includes(host)) {
    const paper = path.match(/\/(?:abs|pdf|html|overview)\/(\d{4}\.\d{4,5})/);
    if (paper) return `arxiv.org/abs/${paper[1]}`;
  }
  if (["youtu.be", "youtube.com", "m.youtube.com"].includes(host)) {
    const video = host === "youtu.be" ? path.slice(1) : url.searchParams.get("v");
    if (video) return `youtube.com/watch?v=${video}`;
  }
  if (["alignmentforum.org", "lesswrong.com"].includes(host)) {
    if (/\/posts\/WZXqNYbJhtidjRXSi(?:\/|$)/.test(path)) return "bounded-regret.ghost.io/what-will-gpt-2030-look-like";
    const chapter = path.match(/\/s\/\w+\/p\/(\w+)/);
    if (chapter) return `lesswrong.com/posts/${chapter[1]}`;
    const post = path.match(/\/(posts|s)\/(\w+)/);
    if (post) return `lesswrong.com/${post[1]}/${post[2]}`;
  }
  if (host === "open.substack.com") {
    const publication = path.match(/^\/pub\/([^/]+)(\/.*)/);
    if (publication) { host = `${publication[1]}.substack.com`; path = publication[2]; }
  }
  if (host === "docs.google.com") {
    const document = path.match(/^\/(document|spreadsheets|presentation)\/d\/(?!e\/)([^/]+)/);
    if (document) return host + document[0];
  }
  if (host === "aisafetyfundamentals.com") host = "bluedot.org";
  if (host === "epochai.org") host = "epoch.ai";
  if (host === "deepmind.com") host = "deepmind.google";
  if (host === "deepmind.google") path = path.replace(/^\/discover\/blog\//, "/blog/");
  if (host === "anthropic.com") path = path.replace(/^\/news\/probes-catch-sleeper-agents$/, "/research/probes-catch-sleeper-agents");
  if (host === "openai.com") path = path.replace(/^\/(blog|research)\/debate$/, "/index/debate");
  if (host === "cdn.openai.com" && path === "/papers/weak-to-strong-generalization.pdf") return "arxiv.org/abs/2312.09390";
  path = path.replace(/\/index\.html$/, "").replace(/\/$/, "");
  const tracking = /^(utm_.*|fbclid|gclid|si|feature|pp|ab_channel|_gl|from_site|r|source|ref|share|s|triedRedirect|trackingId)$/;
  const params = [...url.searchParams].filter(([key]) => !tracking.test(key)).sort(([a], [b]) => a.localeCompare(b));
  const query = new URLSearchParams(params).toString();
  return `${host}${path}${query ? `?${query}` : ""}`;
}

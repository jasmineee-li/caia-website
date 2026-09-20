import type { LibraryResource } from "../content/learning";

export const LIBRARY_FOLDERS = [
  { id: "foundations", title: "Start here", description: "The big picture and the building blocks" },
  { id: "technical", title: "Technical AI safety", description: "Understand, evaluate, and align AI" },
  { id: "governance", title: "Policy & governance", description: "Institutions, standards, and decisions" },
  { id: "forecasting", title: "Forecasting & society", description: "Capabilities, trajectories, and futures" },
  { id: "perspectives", title: "Conversations & ideas", description: "Podcasts, essays, and ongoing commentary" },
  { id: "careers", title: "Paths to contribute", description: "Find your next step" },
] as const;

export function locationFor(resource: LibraryResource): [string, string] {
  if (resource.collection && resource.subtopic) return [resource.collection, resource.subtopic];
  const { topic, group, section } = resource;
  if (topic === "Careers") return ["careers", "Career paths"];
  if (section === "newsletters" || topic === "News & commentary") return ["perspectives", resource.format === "Podcast" ? "Podcasts" : "Newsletters & blogs"];
  if (section === "policy" || topic === "Governance & policy" || topic === "Biosecurity") {
    const subtopics: Record<string, string> = { "Licensing, Auditing and Standards": "Regulation & standards", "Misuse and Conflict": "Misuse & security", "Structural Risk": "Policy foundations" };
    return ["governance", topic === "Biosecurity" ? "Biosecurity" : subtopics[group ?? ""] ?? "Policy foundations"];
  }
  if (topic === "Forecasting & society") return ["forecasting", group === "Emergent Abilities" ? "Capabilities & scaling" : "Scenarios & trajectories"];
  const technical: Record<string, string> = { "Interpretability": "Interpretability", "Evaluations": "Evaluations & red teaming", "Alignment & failure modes": "Reward hacking & misalignment", "Control & oversight": "Scalable oversight" };
  if (technical[topic]) return ["technical", technical[topic]];
  if (section === "technical") return ["technical", "Alignment & training"];
  if (resource.format === "Curriculum") return ["foundations", "Courses & curricula"];
  return ["foundations", topic === "ML fundamentals" ? "ML fundamentals" : "AI safety foundations"];
}

export function searchLibrary(resources: LibraryResource[], query: string, format: string) {
  const normalize = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  return resources.filter(item => (!format || item.format === format) && words.every(word => normalize(`${item.title} ${item.note} ${item.topic} ${locationFor(item).join(" ")}`).includes(word)));
}

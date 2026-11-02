import { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tag fills: the slides' highlighter yellow and sky, plus a light grey. */
const TAG_FILLS = {
  yellow: "#f7f16d",
  sky: "#cdedf9",
  gray: "#e5e7eb",
} as const;

export type TagColor = keyof typeof TAG_FILLS;

/**
 * Three colours, one per broad area: alignment and values in yellow, evaluation and
 * interpretability in sky, policy and society in grey.
 */
const TOPIC_COLORS: Record<string, TagColor> = {
  "value alignment": "yellow",
  corrigibility: "yellow",
  sycophancy: "yellow",
  deception: "yellow",
  theory: "yellow",
  "training gaming": "yellow",
  "mechanism design": "yellow",
  "reward seeking": "yellow",
  "reward hacking": "yellow",
  "alignment training": "yellow",
  "situational awareness": "yellow",
  evaluation: "sky",
  interpretability: "sky",
  "model steering": "sky",
  monitoring: "sky",
  "cognitive science": "sky",
  agents: "sky",
  robotics: "sky",
  policy: "gray",
  governance: "gray",
  "societal impact": "gray",
  "public sector": "gray",
  biosecurity: "gray",
};

const ORDER = Object.keys(TAG_FILLS) as TagColor[];

export function topicColor(topic: string): TagColor {
  const key = topic.toLowerCase();
  if (TOPIC_COLORS[key]) return TOPIC_COLORS[key];
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return ORDER[hash % ORDER.length];
}

/**
 * A filled mono tag, as on the slides' definitions page: uppercase DM Mono on a flat
 * block of colour.
 */
export default function Tag({ children, color = "yellow", className }: { children: ReactNode; color?: TagColor; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-[3px] font-mono text-[0.75rem] font-medium uppercase leading-[1.25] tracking-[0.08em] text-ink",
        className,
      )}
      style={{ backgroundColor: TAG_FILLS[color] }}
    >
      {children}
    </span>
  );
}

/** A row of topic tags. */
export function TopicTags({ topics, className }: { topics: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Topics">
      {topics.map((topic) => (
        <li key={topic}>
          <Tag color={topicColor(topic)}>{topic}</Tag>
        </li>
      ))}
    </ul>
  );
}

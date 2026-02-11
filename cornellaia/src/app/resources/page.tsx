import type { Metadata } from "next";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import {
  RESOURCE_SECTIONS,
  ResourceGroup,
  ResourceItem,
  ResourceSection,
} from "@/content/resources";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Resources",
  description:
    "Curated AI safety resources from Cornell AI Alignment, spanning non-technical intros, technical papers, and governance material.",
  path: "/resources",
  keywords: ["AI safety resources", "alignment reading list", "Cornell AI Alignment resources"],
});

function ResourceList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="space-y-3 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={`${item.title}-${item.href ?? "plain"}`} className="list-disc">
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand-red"
            >
              {item.title}
            </a>
          ) : (
            <span className="font-medium text-slate-900">{item.title}</span>
          )}
          {item.note && <span className="ml-1 text-slate-600">{item.note}</span>}
          {item.children && item.children.length > 0 && (
            <div className="mt-2">
              <ResourceList items={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function ResourceGroupBlock({ group }: { group: ResourceGroup }) {
  return (
    <section className="space-y-3">
      <h4 className="text-lg font-semibold text-slate-900">{group.title}</h4>
      {group.description && <p className="text-sm leading-7 text-slate-600 sm:text-base">{group.description}</p>}
      <ResourceList items={group.items} />
    </section>
  );
}

function toAccordionItem(section: ResourceSection): AccordionItem {
  return {
    id: section.id,
    title: section.title,
    subtitle: section.intro,
    content: (
      <div className="space-y-6">
        {section.groups.map((group) => (
          <ResourceGroupBlock key={`${section.id}-${group.title}`} group={group} />
        ))}
      </div>
    ),
  };
}

export default function ResourcesPage() {
  const accordionItems = RESOURCE_SECTIONS.map(toAccordionItem);

  return (
    <main>
      <Section
        title="Learning resources for AI safety"
        subtitle="Curated material spanning non-technical introductions, technical work, and governance policy."
      >
        <MotionReveal>
          <Accordion items={accordionItems} defaultOpenIds={["non-technical"]} />
        </MotionReveal>
      </Section>
    </main>
  );
}

import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpenIds?: string[];
}

export default function Accordion({
  items,
  className,
  defaultOpenIds = [],
}: AccordionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const openByDefault = defaultOpenIds.includes(item.id);

        return (
          <details
            key={item.id}
            className="group surface-card overflow-hidden"
            open={openByDefault}
          >
            <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-5 px-5 py-4 text-left sm:px-6">
              <span>
                <span className="block text-lg font-semibold text-slate-900">{item.title}</span>
                {item.subtitle && (
                  <span className="mt-1 block text-sm text-slate-600">{item.subtitle}</span>
                )}
              </span>
              <span
                className="mt-1 text-xl leading-none text-brand-red transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="border-t border-slate-200 px-5 py-5 sm:px-6 sm:py-6">{item.content}</div>
          </details>
        );
      })}
    </div>
  );
}

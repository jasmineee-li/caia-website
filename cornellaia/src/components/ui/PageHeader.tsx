import { ReactNode } from "react";
import Container from "@/components/ui/Container";
import DotRows from "@/components/ui/DotRows";
import HalftoneField from "@/components/ui/HalftoneField";

/** The design system's dark halftone blue, as in the home hero's fan. */
const DOT = "#0c4da2";

interface PageHeaderProps {
  title: string;
  /** Replaces the plain title inside the h1, e.g. for an animated title. */
  titleContent?: ReactNode;
  eyebrow?: string;
  lead?: ReactNode;
  children?: ReactNode;
  /** Draws a different dot field in place of the halftone field on wider screens, given its classes. */
  renderField?: (className: string) => ReactNode;
  /** Colours the phone strip like the Join page's rings. */
  dotRings?: boolean;
}

/**
 * The top of an inner page: grid paper, as on the home hero, closing on a rule, with the
 * halftone field growing in from the right, a large serif title and a short lead.
 * On phones a few even rows of dots run along the bottom edge instead, clear of the text.
 */
export default function PageHeader({ title, titleContent, eyebrow, lead, children, renderField, dotRings }: PageHeaderProps) {
  return (
    <header className="grid-paper relative isolate border-b border-grid [background-position:center_bottom] md:overflow-hidden">
      {renderField ? (
        renderField("absolute inset-y-0 right-0 -z-10 hidden h-full w-[42%] md:block lg:w-[46%]")
      ) : (
        <HalftoneField color={DOT} className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] md:block lg:w-[46%]" />
      )}
      <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20 md:pb-24 lg:pb-28 lg:pt-28">
        <div className="md:max-w-[60%] lg:max-w-[52%]">
          {eyebrow && <p className="mono-label mb-5 text-brand-red">{eyebrow}</p>}
          <h1 className="display-title text-[3rem] leading-[1] sm:text-[4.5rem] lg:text-[5.25rem]">{titleContent ?? title}</h1>
          {lead && <div className="lead-copy mt-6 max-w-2xl sm:mt-8">{lead}</div>}
          {children && <div className="mt-8 sm:mt-10">{children}</div>}
        </div>
      </Container>
      {/* Phones: a few even rows of dots across the full width, sitting on the bottom edge of the
          grid paper, with the last row running past the closing rule onto the page below. */}
      <DotRows color={DOT} rings={dotRings} className="relative translate-y-[14px] md:hidden" />
    </header>
  );
}

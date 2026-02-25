import Link from "next/link";
import Container from "@/components/ui/Container";
import CircularText from "@/components/ui/CircularText";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/90 py-10">
      <Container>
        <div className="relative space-y-4 text-sm sm:text-base md:pr-40">
          <p className="text-sm text-slate-700 sm:text-base">
            Proudly run by{" "}
            <Link
              href="/team"
              className="focus-ring rounded-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
            >
              CAIA members
            </Link>
            . Email us at{" "}
            <a
              href="mailto:cornellaialignment@gmail.com"
              className="focus-ring rounded-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
            >
              cornellaialignment@gmail.com
            </a>
          </p>

          <div className="space-y-2 text-sm text-slate-600 sm:text-[0.95rem]">
            <p>This organization is a registered student organization of Cornell University.</p>
            <Link
              href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-block rounded-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
            >
              Equal Education &amp; Employment
            </Link>
          </div>

          <div className="mx-auto w-fit pt-2 md:absolute md:-bottom-2 md:right-0 md:mx-0 md:pt-0">
            <CircularText
              text="CORNELL*AI*ALIGNMENT*CLUB*"
              onHover="speedUp"
              spinDuration={20}
              size={112}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

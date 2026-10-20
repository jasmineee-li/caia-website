import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { HOME_CTA_ITEMS, HOME_HERO } from "@/content/home";
import { EVENTS_CALENDAR_URL } from "@/content/events";
import { NAV_ITEMS } from "@/content/navigation";

const CONNECT = [
  { label: "Slack", href: HOME_CTA_ITEMS[0].href },
  { label: "Instagram", href: "https://www.instagram.com/cornell.aia/" },
  { label: "Events on Luma", href: EVENTS_CALENDAR_URL },
];

export default function Footer() {
  return (
    <footer className="mt-28 bg-panel text-ink sm:mt-36">
      <Container className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            {/* Red and black, as in the logo. */}
            <p className="display-title max-w-md text-[2rem] leading-[1.1] sm:text-[2.75rem]">
              <span className="block text-brand-red">Cornell</span>
              <span className="block">AI Alignment</span>
            </p>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">{HOME_HERO.subtitle}</p>
            <div className="mt-8">
              <Button href={HOME_CTA_ITEMS[0].href} external variant="inverseRed">Join our Slack</Button>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-7">
            <div>
              <p className="mono-label text-brand-red">Explore</p>
              <ul className="mt-5 space-y-3">
                {NAV_ITEMS.filter((item) => item.href !== "/").map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="focus-ring text-[0.9375rem] text-ink transition-colors hover:text-brand-red">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label text-brand-red">Connect</p>
              <ul className="mt-5 space-y-3">
                {CONNECT.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="focus-ring text-[0.9375rem] text-ink transition-colors hover:text-brand-red">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mono-caption mt-16 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>This organization is a registered student organization of Cornell University.</p>
          <a
            href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-brand-red underline decoration-[rgba(179,27,27,0.35)] underline-offset-4 hover:decoration-current"
          >
            Equal Education &amp; Employment
          </a>
        </div>
      </Container>
    </footer>
  );
}

import Image from "next/image";
import Container from "@/components/ui/Container";
import { HOME_SPONSORS } from "@/content/home";

/**
 * Optical corrections on top of the area-based sizing: marks whose drawing fills its box
 * (LISA) read large, and marks with small type inside a wide box (SPAR, CBAI, Gray Swan)
 * read small.
 */
const OPTICAL: Record<string, number> = {
  LISA: 0.78,
  CBAI: 1.18,
  "Berkeley SPAR": 1.3,
  "Gray Swan": 1.3,
  "Center for AI Safety": 1.1,
  "Amazon AGI": 0.9,
};

/** Logos sized to a similar visual area, so long wordmarks and square marks balance. */
function logoSize(name: string, width: number, height: number) {
  const aspect = width / height;
  const h = Math.min(40, Math.sqrt(4600 / aspect), 150 / aspect) * (OPTICAL[name] ?? 1);
  return { width: Math.round(h * aspect), height: Math.round(h) };
}

/**
 * Full-bleed warm panel band, the same palette as the footer: every logo in ink, each in
 * its own white cell, like the visuals on the program cards.
 */
export default function LogoBand() {
  return (
    <section aria-labelledby="worked-with-title" className="mt-28 bg-panel py-20 sm:mt-36 sm:py-28 lg:py-32">
      <Container>
        <h2 id="worked-with-title" className="display-title text-[2.125rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
          Our members have worked with
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:mt-16 sm:grid-cols-4 sm:gap-3">
          {HOME_SPONSORS.map((sponsor) => {
            const logo = sponsor.mono ?? { src: sponsor.src, width: 320, height: 120 };
            const size = logoSize(sponsor.name, logo.width, logo.height);
            return (
              <li key={sponsor.name}>
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${sponsor.name} website`}
                  className="focus-ring group flex h-24 items-center justify-center rounded-[8px] bg-white px-4 sm:h-32"
                >
                  <Image
                    src={logo.src}
                    alt={`${sponsor.name} logo`}
                    width={size.width}
                    height={size.height}
                    style={{ width: size.width, height: "auto" }}
                    className="max-w-[78%] opacity-75 transition-opacity sm:max-w-full [filter:brightness(0)] group-hover:opacity-100"
                    loading="lazy"
                    sizes={`${size.width}px`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

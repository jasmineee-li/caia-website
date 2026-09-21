import { SITE_URL } from "./seo";
import { EVENTS_CALENDAR_URL } from "./events";

export const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cornell AI Alignment",
      alternateName: "CAIA",
      url: `${SITE_URL}/`,
      description: "A community of students, faculty, and researchers at Cornell working on AI safety, alignment, policy, and governance through research, education, and open events.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 773,
        height: 747,
      },
      sameAs: [EVENTS_CALENDAR_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Cornell AI Alignment",
      alternateName: "CAIA",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

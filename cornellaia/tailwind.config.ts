import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-paper-50)",
        foreground: "var(--color-ink-900)",
        "brand-red": "var(--color-brand-red)",
        "brand-red-strong": "var(--color-brand-red-strong)",
        "brand-cyan": "var(--color-brand-cyan)",
        "ink-muted": "var(--color-ink-700)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },
      borderRadius: {
        xl2: "var(--radius-xl)",
      },
      maxWidth: {
        page: "var(--max-page-width)",
        content: "var(--max-content-width)",
      },
      backgroundImage: {
        hero: "var(--bg-hero)",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

/* Warm greys from the CAIA design system, mapped onto Tailwind's slate scale so the
   whole site picks up the same neutrals: 50 panel, 200 rule, 500 muted, 600 ink-2, 900 ink. */
const warm = {
  50: "#f6f5f3",
  100: "#efedea",
  200: "#d9d6d2",
  300: "#c4c0bb",
  400: "#a9a49f",
  500: "#6b6661",
  600: "#534e49",
  700: "#423e3a",
  800: "#2a2725",
  900: "#141313",
  950: "#0b0a0a",
};

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
        slate: warm,
        background: "var(--paper)",
        foreground: "var(--ink)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        panel: "var(--panel)",
        sky: "var(--sky)",
        blue: { DEFAULT: "var(--blue)", deep: "#0a4392" },
        "sky-soft": "#eaf7fc",
        "brand-red": "var(--red)",
        "brand-red-strong": "var(--color-brand-red-strong)",
        "brand-cyan": "var(--blue)",
        "ink-muted": "var(--ink-2)",
        highlight: "var(--highlight)",
        grid: "var(--grid)",
        // Pale blue writing lines, as on ruled notebook paper.
        "notebook-rule": "#a9cfe8",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        soft: "none",
        lift: "none",
      },
      borderRadius: {
        xl2: "var(--radius-xl)",
      },
      maxWidth: {
        page: "var(--max-page-width)",
        content: "var(--max-content-width)",
      },
    },
  },
  plugins: [],
} satisfies Config;

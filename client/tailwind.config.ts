import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue-dark": "var(--blue-dark)",
        "blue-primary": "var(--blue-primary)",
        "purple-primary": "var(--purple-primary)",
        "purple-light": "var(--purple-light)",
      },
    },
  },
  plugins: [],
};
export default config;

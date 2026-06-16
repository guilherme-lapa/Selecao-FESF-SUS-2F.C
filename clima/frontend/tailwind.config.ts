import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--fonte-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ceu: {
          claro: "#dbeafe",
          medio: "#60a5fa",
          escuro: "#1e3a8a",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

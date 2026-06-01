import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Tema claro com acento elétrico (índigo/violeta) e tinta quase-preta.
        tinta: {
          900: "#11131a",
          700: "#3a3f4f",
          500: "#6b7280",
        },
        eletrico: {
          DEFAULT: "#4f46e5",
          claro: "#6366f1",
          fundo: "#eef2ff",
        },
        papel: {
          DEFAULT: "#fbfbfd",
          cartao: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--fonte-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--fonte-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        suave: "0 1px 3px rgba(17, 19, 26, 0.06), 0 8px 24px -12px rgba(17, 19, 26, 0.12)",
        realce: "0 0 0 3px rgba(79, 70, 229, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

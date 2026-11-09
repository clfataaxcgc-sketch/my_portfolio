/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#07090c",
          900: "#0c0f14",
          800: "#12161d",
          700: "#1a2029",
          600: "#242b37",
          500: "#3a4353",
        },
        paper: {
          50: "#f7f8fa",
          100: "#eef0f4",
        },
        signal: {
          DEFAULT: "#7c5cff",
          soft: "#a78bfa",
          dim: "#5b3fd6",
        },
        mint: {
          DEFAULT: "#2dd4a7",
        },
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
    },
  },
  plugins: [],
};

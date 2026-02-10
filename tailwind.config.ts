import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#030814",
        pulse: "#F65A83",
        aqua: "#44C2E2",
        sun: "#FFAF7B",
      },
      boxShadow: {
        halo: "0 25px 80px rgba(3,8,20,0.55)",
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        body: ["var(--font-spline)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a56db",
          light: "#e8f0fe",
          dark: "#1239a5",
        },
        success: {
          DEFAULT: "#057a55",
          light: "#d1fae5",
        },
        error: {
          DEFAULT: "#e02424",
          light: "#fde8e8",
        },
        warning: {
          DEFAULT: "#d97706",
          light: "#fef3c7",
        },
      },
    },
  },
  plugins: [],
};

export default config;

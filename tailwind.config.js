import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#032541",
      },
      screens: {
        xs: "350px",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

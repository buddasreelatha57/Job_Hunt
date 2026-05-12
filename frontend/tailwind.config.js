/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌸 LIGHT MODE (PINK + PURPLE)
        primary: "#9333ea",   // purple
        accent: "#ec4899",    // pink

        // 🌙 DARK MODE
        darkbg: "#0F172A",
        darkcard: "#1E293B",
        darkteal: "#0F766E",
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#050505",
        surface: "#111111",
        accent: "#3B82F6",
        secondary: "#6366F1",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A1A1AA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

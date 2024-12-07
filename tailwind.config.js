/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.{md,mdx}",
    "./docs/**/**/*.{md,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        incognito: ["var(--incognito)"],
        inter: ["var(--inter)"],
      },
      colors: {
        "primary-color": "#33E092",
        "secondary-color": "#0CCE6B",
        "tertiary-color": "#16a34a",
        "primary-bg": "rgba(39, 39, 43, 0.4)",
        "secondary-bg": "rgba(250, 250, 250, 0.4)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}


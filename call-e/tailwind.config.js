/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "calle-bg-light": "#f8f9fa",
        "calle-bg-dark": "#2F3142",
        "calle-gray": "#E0E0E0",
        "calle-text-color": "#415B6A",
        "calle-black": "#1D1D1D",
        "calle-btn-bg": "#4F46E5",
        "calle-btn-hoverBg": "#635bf5",
      },
    },
  },
  plugins: [],
};

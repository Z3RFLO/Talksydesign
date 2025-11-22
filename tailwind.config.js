/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default text (Clean like Pinterest)
        display: ['Poppins', 'sans-serif'], // Headings (Bold & Aesthetic)
      },
    },
  },
  plugins: [],
}
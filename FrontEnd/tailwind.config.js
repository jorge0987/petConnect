/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8FBE2A",
        "outra": "#53740E",
        "secondary": "#3D9BF2",
        "third": "#d3d3d3",
        "background": "#F4F4F4",
        "gray-1": "BDBDBD",
      }
    },
  },
  plugins: [],
}
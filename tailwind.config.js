/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", //local components
    "./src/**/*.{js,jsx,ts,tsx}", //material components
  ],
  important: "#__next", // +material-tailwind
  theme: {
    extend: {},
  },
  corePlugins: {
    // +material
    preflight: false,
  },
  plugins: [],
};

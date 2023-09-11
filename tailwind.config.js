/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { satoshi: ["Satoshi", "sans-serif"] },
    },
  },
  plugins: [],
};

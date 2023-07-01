/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dfGrey: "#393939",
        dfText: "#202020",
      },
    },
  },
  plugins: [],
};

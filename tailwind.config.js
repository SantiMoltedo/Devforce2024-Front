/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Ubuntu", "sans-serif"],
      },
      colors: {
        dfLight: "#FAFAFA",
        dfGrey: "#393939",
        dfText: "#202020",
        dfGreyDark: "#777777",
        primary: "#00B4FF",
        secondary: "#7D00D2",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dfLight: "#FAFAFA",
        dfGrey: "#393939",
        dfText: "#202020",
        dfGreyDark: "#777777",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

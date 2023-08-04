/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      width: {
        content: "880px",
      },
      borderColor: {
        gray1: "#d5d5d5",
      },
      backgroundColor: {
        gray1: "#f5f5f5",
      },
    },
  },
  plugins: [],
};

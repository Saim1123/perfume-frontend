/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "100%",
          md: "728px",
          lg: "984px",
          xl: "1240px",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
};

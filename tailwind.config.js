/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#9fbfd6", // Background for Academics
          dark: "#314d65", // Border for Academics
        },
        red: {
          DEFAULT: "#e7c5ce", // Background for Social Life
          dark: "#a1544a", // Border for Social Life
        },
        yellow: {
          DEFAULT: "#f6e36b", // Background for Energy
          dark: "#b98d35", // Border for Energy
        },
        green: {
          DEFAULT: "#d3e5d7", // Background for Mental Health
          dark: "#4d676c", // Border for Mental Health
        },
      },
    },
  },
  plugins: [],
};

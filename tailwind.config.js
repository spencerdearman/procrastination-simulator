/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#9fbfd6", // Background for Academics
          dark: "#314d65", // Border for Academics
          disabled: "#c9d8e3", // Muted blue for disabled state
        },
        red: {
          DEFAULT: "#e7c5ce", // Background for Social Life
          dark: "#a1544a", // Border for Social Life
          disabled: "#f0d7dd", // Muted red for disabled state
        },
        yellow: {
          DEFAULT: "#f6e36b", // Background for Energy
          dark: "#b98d35", // Border for Energy
          disabled: "#f9f0b4", // Muted yellow for disabled state
        },
        green: {
          DEFAULT: "#d3e5d7", // Background for Mental Health
          dark: "#4d676c", // Border for Mental Health
          disabled: "#e3ede7", // Muted green for disabled state
        },
      },
    },
  },
  plugins: [],
};

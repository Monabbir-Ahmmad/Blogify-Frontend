import colors from "tailwindcss/colors";

const themeColors = {
  background: "var(--color-background)",

  primary: colors.violet[500],
  primaryDark: colors.violet[700],
  primaryLight: colors.violet[300],
  primaryLighter: colors.violet[100],

  error: colors.red[500],
  errorDark: colors.red[700],
  errorLight: colors.red[300],
  errorLighter: colors.red[100],
};

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: themeColors,
    },
  },
};

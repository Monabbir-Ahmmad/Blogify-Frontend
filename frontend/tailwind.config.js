const themeColors = {
  text: "var(--color-text)",

  shadow: "var(--color-shadow)",

  background: "var(--color-background)",

  paper: "var(--color-paper)",

  divider: "var(--color-divider)",

  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  primaryLight: "var(--color-primary-light)",
  primaryLighter: "var(--color-primary-lighter)",

  error: "var(--color-error)",
  errorDark: "var(--color-error-dark)",
  errorLight: "var(--color-error-light)",
  errorLighter: "var(--color-error-lighter)",
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

const themeColors = {
  background: "var(--color-background)",
  backgroundLight: "var(--color-background-light)",

  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  primaryLight: "var(--color-primary-light)",
  primaryLighter: "var(--color-primary-lighter)",

  accent: "var(--color-accent)",
  accentDark: "var(--color-accent-dark)",
  accentLight: "var(--color-accent-light)",

  error: "var(--color-error)",
  errorDark: "var(--color-error-dark)",
  errorLight: "var(--color-error-light)",
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

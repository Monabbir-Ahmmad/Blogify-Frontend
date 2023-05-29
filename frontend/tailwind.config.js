const themeColors = {
  background: "var(--color-background)",

  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  primaryLight: "var(--color-primary-light)",
  primaryLighter: "var(--color-primary-lighter)",

  accent: "var(--color-accent)",
  accentDark: "var(--color-accent-dark)",
  accentLight: "var(--color-accent-light)",
  accentLighter: "var(--color-accent-lighter)",

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

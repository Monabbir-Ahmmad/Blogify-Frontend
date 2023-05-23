const themeColors = {
  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  primaryLight: "var(--color-primary-light)",

  secondary: "var(--color-secondary)",
  secondaryDark: "var(--color-secondary-dark)",
  secondaryLight: "var(--color-secondary-light)",

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
  theme: {
    extend: {
      colors: themeColors,
      backgroundColor: themeColors,
      borderColor: themeColors,
      ringColor: themeColors,
    },
  },
};

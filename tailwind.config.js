// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🚨 ¡REVISA ESTA SECCIÓN CUIDADOSAMENTE! 🚨
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Para el App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Para el Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Si tienes todo dentro de 'src'
  ],
  theme: {
    extend: {
      textShadowYellow: {
        sm: "0 0 4px rgba(255, 255, 0, 0.4)",
        md: "0 0 10px rgba(255, 255, 0, 0.7)",
        lg: "0 0 18px rgba(255, 255, 0, 0.9)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-glow-yellow-lg": {
          textShadow: theme("textShadowYellow.lg"),
        },
        ".text-glow-yellow-md": {
          textShadow: theme("textShadowYellow.md"),
        },
        ".text-glow-yellow-sm": {
          textShadow: theme("textShadowYellow.sm"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

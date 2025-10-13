// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🚨 ¡REVISA ESTA SECCIÓN CUIDADOSAMENTE! 🚨
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
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};

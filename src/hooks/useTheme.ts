import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  // Inicializa el estado en 'light' o null para evitar errores de SSR
  const [theme, setTheme] = useState<Theme | null>(null);

  // 1. Efecto para INICIALIZAR el tema al cargar la página (solo se ejecuta una vez)
  useEffect(() => {
    // Lee la preferencia guardada o usa 'light' como valor inicial
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    // Si hay una preferencia guardada, úsala. Si no, usa 'light'.
    const initialTheme: Theme = storedTheme || "light";

    setTheme(initialTheme);
  }, []); // ⬅️ Array de dependencias vacío para solo ejecutar en el montaje

  // 2. Efecto para APLICAR los cambios cada vez que 'theme' cambia
  useEffect(() => {
    if (!theme || typeof window === "undefined") return; // Espera a que el tema se inicialice

    const root = window.document.documentElement;

    // Limpia AMBAS clases y añade la correcta
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Guarda la preferencia al hacer el cambio
    localStorage.setItem("theme", theme);
  }, [theme]); // ⬅️ Se ejecuta al inicializar y cada vez que se hace toggle

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Devuelve el estado (que será 'light' o 'dark' después del primer render)
  return { theme: theme || "light", toggleTheme };
};

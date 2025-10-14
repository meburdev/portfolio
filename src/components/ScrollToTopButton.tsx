import React, { useState, useEffect, useCallback } from "react";

const SCROLL_THRESHOLD = 245; // Distancia en píxeles para mostrar el botón

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Lógica para mostrar/ocultar el botón
  const handleScroll = useCallback(() => {
    // Si la posición vertical es mayor a 300px, lo hacemos visible
    const newVisibility = window.scrollY > SCROLL_THRESHOLD;
    setIsVisible(newVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Limpia el listener al desmontar el componente (limpieza esencial de useEffect)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Si no es visible, no renderizamos nada (o podrías animarlo fuera de la pantalla)
  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="
        fixed bottom-6 right-6 z-50 
        p-4 rounded-full text-white 
        shadow-xl hover:scale-105 
        transition-all duration-300 ease-in-out
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;

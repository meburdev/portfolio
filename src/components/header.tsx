import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // <-- CAMBIO AQUÍ
import { useTranslation } from "next-i18next";

const HeaderComponent: React.FC = () => {
  const { t } = useTranslation("common");
  const [showAbout, setShowAbout] = useState(false);

  const slideAnimation = {
    // Estado inicial (la animación empieza "fuera" de la vista, arriba y a la derecha)
    hidden: { x: 50, y: -20, opacity: 0 },
    // Estado final (la animación termina en su posición normal)
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8, // Duración de 0.8 segundos
        ease: "easeOut", // Tipo de aceleración para un movimiento suave
      },
    },
    // Estado para salir (opcional, si se oculta de nuevo)
    exit: {
      x: 50,
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.8, // Duración de salida: 0.3 segundos (mucho más rápido)
        ease: "easeIn", // Usamos 'easeIn' para que la desaparición se sienta más abrupta/rápida
      },
    },
  };

  const toggleShowAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <header id="header">
      <div className="flex justify-between text-white min-h-60 w-full pb-5 md:pb-5 px-4 shadow-md h-full">
        <div className="text-2xl flex-col w-3/12">
          <div
            className="font-extrabold"
            style={{ fontFamily: "var(--font-philosopher)" }}
          >
            Levi Medina,
          </div>
          <div
            className="text-gray-400"
            style={{ fontFamily: "var(--font-philosopher)" }}
          >
            {t("developer")}
          </div>
        </div>
        <div className="text-2xl font-bold flex w-9/12">
          <div className="flex justify-between items-start w-full h-full">
            <div className="w-5/6 flex-shrink-0 m-auto">
              <AnimatePresence>
                {showAbout && (
                  <motion.div
                    exit="exit" // <-- ESTO LE INDICA A FRAMER QUE USE EL ESTADO 'exit'
                    key="about-content" // 2. AÑADIMOS UNA KEY ÚNICA
                    initial="hidden"
                    animate="visible"
                    exit="exit" // 3. LE INDICAMOS QUE USE EL ESTADO 'exit'
                    variants={slideAnimation}
                    className="flex items-center justify-start"
                  >
                    {/* Contenido de la imagen y texto... (sin cambios) */}
                    <div className="flex-shrink-0 pl-12">
                      <Image
                        src="/images/personal-picture.jpg"
                        alt={`Levi Medina - ${t("profile-image")}`}
                        className="w-36 h-36 rounded-full mr-6 shadow-xl border-2 border-zinc-700"
                        width={144}
                        height={144}
                      />
                    </div>
                    <div className="flex-grow">
                      <div
                        className="h-full px-10 pt-5 text-base"
                        style={{ fontFamily: "var(--font-philosopher)" }}
                      >
                        {t("about-me-text")}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="hover:text-zinc-500 transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white self-start cursor-pointer"
              onClick={toggleShowAbout}
            >
              {t("about")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

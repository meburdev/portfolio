import React, { useState } from "react";
import Image from "next/image";

import { useTranslation } from "next-i18next";

const HeaderComponent: React.FC = () => {
  const { t } = useTranslation("common");
  const [showAbout, setShowAbout] = useState(false);

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
              {showAbout && (
                <div className="flex items-center justify-start">
                  <div className="flex-shrink-0 pl-12">
                    <Image
                      src="/images/personal-picture.jpg"
                      alt="Levi Josue Medina Burguillos - Perfil"
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
                </div>
              )}
            </div>

            <div
              className="hover:text-zinc-500 transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white self-start"
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

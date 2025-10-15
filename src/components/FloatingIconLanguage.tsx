import FlagIconUsa from "@/components/icons/us-flag.svg";
import FlagIconSpain from "@/components/icons/es-flag.svg";
import { i18n, useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useCallback, useState } from "react";

interface DefaultBodySectionProps {
  href?: string;
  label?: string;
}

const FloatingIcon: React.FC<DefaultBodySectionProps> = () => {
  const { t } = useTranslation("common");

  const usFlag = React.useMemo(
    () => ({
      lang: "en",
      country: "usa",
      src: FlagIconUsa,
    }),
    []
  );

  const esFlag = React.useMemo(
    () => ({
      lang: "es",
      country: "espana",
      src: FlagIconSpain,
    }),
    []
  );

  const [selectedLanguage, setSelectedLanguage] = useState(usFlag);

  const toggleFlag = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      setSelectedLanguage((prev) => {
        const next = prev.lang === "en" ? esFlag : usFlag;
        if (i18n?.changeLanguage) {
          i18n.changeLanguage(next.lang);
        }
        return next;
      });
    },
    [esFlag, usFlag]
  );

  return (
    <div className="h-[60px] w-[110px] flex justify-center rounded-md m-auto scale-75 fixed bottom-4 left-4 z-50 cursor-pointer transform-gpu transition-transform duration-300 hover:scale-100 bg-white dark:bg-black shadow-md">
      <div className="block m-auto" onClick={toggleFlag}>
        <div className="relative min-w-[80px] h-8 pt-5">
          <div
            className={`flex justify-between absolute inset-0 transition-opacity duration-500 ${
              selectedLanguage.lang === "en"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="m-auto text-black dark:text-white">EN</div>
            <Image
              src={usFlag.src}
              alt={t(`flag.${usFlag.country}`)}
              className="object-cover max-w-[40px] max-h-[22px] m-auto"
              width={40}
            />
          </div>

          <div
            className={`flex justify-between absolute inset-0 transition-opacity duration-500 ${
              selectedLanguage.lang === "es"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="m-auto">ES</div>
            <Image
              src={esFlag.src}
              alt={t(`flag.${esFlag.country}`)}
              className="object-cover max-w-[40px] max-h-[22px] m-auto"
              width={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingIcon;

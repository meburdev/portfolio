import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const HeaderComponent: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <header id="header">
      <div className="flex justify-between text-white min-h-60 w-full pb-5 md:pb-5 px-4 shadow-md h-full">
        <div className="text-2xl flex-col">
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
        <div className="text-2xl font-bold">
          <Link
            href="/#experience"
            className="hover:text-zinc-500 transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white"
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

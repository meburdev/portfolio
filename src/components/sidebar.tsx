import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const SideBarComponent: React.FC = () => {
  const { t } = useTranslation("common");

  const linkClass =
    "text-xs block border-t border-zinc-700 px-2 py-2 hover:bg-white hover:text-black transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-white";

  const navItems = [
    { href: "mailto:mebur.dev@gmail.com", key: "mebur.dev@gmail.com" },
    { href: "https://wa.me/584169711833", key: "+58 (416) 971-1833" },
    {
      href: "https://www.linkedin.com/in/levi-josue-medina-burguillos-02b388261/",
      key: "linkedin",
    },
  ];

  return (
    <nav
      id="sidebar"
      className="w-full md:w-2/6 md:sticky md:top-0 self-start flex flex-col pb-5 md:pb-5 px-4 shadow-md h-full border-t border-zinc-700 font-inter"
    >
      <div className="text-sm py-6 min-h-50 pr-7">{t("personal-profile")}</div>

      <div className="space-y-10">
        <ul className="text-lg">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {item.key} <span className="font-bold text-xs"> ↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideBarComponent;

import React from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

const SideBarComponent: React.FC = () => {
  const { t } = useTranslation("common");
  const { theme, toggleTheme } = useTheme(); // Asumiendo este hook
  const isDarkTheme = theme === "dark";

  const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const linkClass =
    "text-xs block border-t px-2 py-2 px-5 md:px-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-white";

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
      className="w-full md:w-2/6 md:sticky md:top-0 self-start flex flex-col pb-20 md:px-4 h-full border-t border-zinc-700 font-inter shadow-md"
    >
      <div className="hidden md:block text-sm py-6 min-h-50 pr-7">
        {t("personal-profile")}
      </div>

      <div className="space-y-10">
        <ul className="text-lg px-5 md:px-0">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} ${
                  index !== 0 ? "border-zinc-700" : "md:border-zinc-700"
                }`}
              >
                {item.key} <span className="font-bold text-xs"> ↗</span>
              </Link>
            </li>
          ))}
          <li className="flex justify-end border-t border-zinc-700">
            <button
              onClick={toggleTheme}
              aria-label={
                isDarkTheme
                  ? `{${t("change-to-light")}}`
                  : `{${t("change-to-dark")}`
              }
              className="p-2 xl:pr-0 rounded-full transition-colors duration-300 text-xs"
            >
              {isDarkTheme ? (
                <div className="flex">
                  <SunIcon className="w-4 h-4 text-zinc-100 hover:text-yellow-400" />{" "}
                  <span className="font-bold m-auto pl-1">
                    {t("light-mode")}
                  </span>
                </div>
              ) : (
                <div className="flex">
                  <MoonIcon className="w-4 h-4 text-gray-800 hover:text-gray-600" />{" "}
                  <div className="font-bold m-auto pl-1">{t("dark-mode")}</div>
                </div>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBarComponent;

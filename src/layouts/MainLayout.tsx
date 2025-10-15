import SideBarComponent from "@/components/sidebar";
import HeaderComponent from "@/components/header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import FloatingIcon from "@/components/FloatingIconLanguage";
import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Head from "next/head"; // 🚀 1. Importar el componente Head

type Props = {
  children?: ReactNode;
  font: string;
};

export default function MainLayout({ children, font }: Props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Levi J. Medina | Desarrollador Front-end & MERN</title>
        <meta
          name="description"
          content="Portafolio profesional de Levi Josue Medina, desarrollador con experiencia en React, Next.js y el stack MERN."
        />
        <link rel="icon" href="/icons/mb.svg" type="image/svg+xml" />
      </Head>
      <div
        className={`min-h-screen flex flex-col bg-white text-black dark:text-white dark:bg-black  p-4 ${font}`}
      >
        <FloatingIcon />
        <ScrollToTopButton />
        <div className="max-w-[95%] sm:max-w-[90%] mx-auto">
          <HeaderComponent />
          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <SideBarComponent />
            <main className="w-full md:w-/6">{children}</main>
          </div>
          <footer className="w-full">
            <div
              className="w-full text-2xl font-semibold pb-20 flex justify-end"
              style={{ fontFamily: "var(--font-philosopher)" }}
            >
              <Link
                href="mailto:mebur.dev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact-me")}
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

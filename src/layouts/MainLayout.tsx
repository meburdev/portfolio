import SideBarComponent from "@/components/sidebar";
import HeaderComponent from "@/components/header";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import FloatingIcon from "@/components/FloatingIconLanguage";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  font: string;
};

export default function MainLayout({ children, font }: Props) {
  return (
    <div
      className={`min-h-screen flex flex-col bg-black text-white  p-4 ${font}`}
    >
      <FloatingIcon />
      <ScrollToTopButton />
      <div className="max-w-[90%] mx-auto">
        <HeaderComponent />
        <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
          <SideBarComponent />
          <main className="w-full md:w-/6">{children}</main>
        </div>
        <footer className="w-full"></footer>
      </div>
    </div>
  );
}

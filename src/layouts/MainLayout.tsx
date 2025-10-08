import SideBarComponent from "@/components/sidebar";
import type { ReactNode } from "react";
import HeaderComponent from "@/components/header";
import FloatingIcon from "@/components/FLoatingIcon";

type Props = {
  children?: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col p-4 bg-black text-white">
      <FloatingIcon />
      <div className="max-w-[80%] mx-auto">
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

import ExperienceSection from "@/sections/ExperienceSection";
import SkillsSection from "@/sections/SkillsSection";
import EducationSection from "@/sections/EducationSection";
import ChatBotDemo from "@/sections/demos/ChatBotDemo";
import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

const HomePage: NextPage = () => {
  const [selectedArea, setSelectedArea] = useState("profile");

  return (
    <div>
      <div className="flex font-inter font-bold  text-black dark:text-gray-100 shadow-md">
        <div
          className={`p-5 border-zinc-300 shadow-md hover:cursor-pointer ${
            selectedArea === "profile"
              ? "bg-zinc-300 dark:bg-zinc-800"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-100"
          }`}
          style={{ fontFamily: "var(--font-philosopher)" }}
          onClick={() => setSelectedArea("profile")}
        >
          PROFILE
        </div>
        <div
          className={`p-5 border-zinc-300  shadow-md hover:cursor-pointer   ${
            selectedArea !== "profile"
              ? "bg-zinc-300 dark:bg-zinc-800"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-100"
          }`}
          style={{ fontFamily: "var(--font-philosopher)" }}
          onClick={() => setSelectedArea("projects")}
        >
          DEMO PROJECTS
        </div>
      </div>
      {selectedArea === "profile" ? (
        <div>
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
        </div>
      ) : (
        <div>
          <ChatBotDemo />
        </div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default HomePage;

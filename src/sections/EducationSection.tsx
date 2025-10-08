import React from "react";
import { useTranslation } from "next-i18next";
import DefaultBodySection from "@/components/DefaultBodySection";
import { MOCK_EXPERIENCE } from "@/data/experience"; // Carga los datos mock

const SkillsSection: React.FC = () => {
  const { t } = useTranslation("common");

  const skillsLeft = (
    <div>
      <div></div>
    </div>
  );

  const skillsRight = (
    <div>
      <h2 className="text-md text-zinc-500 pb-5">Certifications</h2>
      <ul className="list-disc list-inside pb-12">
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
      </ul>
    </div>
  );

  return (
    <section id="skills" className="border-t border-zinc-700">
      <h1 className="text-xs font-semibold pt-5 pb-10">{t("education")}</h1>
      <DefaultBodySection
        borderTop={false}
        leftContent={skillsLeft}
        rightContent={skillsRight}
      />
    </section>
  );
};

export default SkillsSection;

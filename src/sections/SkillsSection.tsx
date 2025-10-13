import React from "react";
import { useTranslation } from "next-i18next";
import DefaultBodySection from "@/components/DefaultBodySection";
import { MOCK_SKILLS } from "@/data/skills"; // Carga los datos mock

const SkillsSection: React.FC = () => {
  const { t } = useTranslation("common");
  const technicalSkills = MOCK_SKILLS[0];
  const efficiencySkills = MOCK_SKILLS[1];
  const interpersonalSkills = MOCK_SKILLS[2];

  const skillsLeft = (
    <div>
      <div>
        <h2 className="text-zinc-500">{t(technicalSkills.skillOrientation)}</h2>
        <ul className="list-disc list-inside pb-12 pl-5 pt-5 text-sm space-y-1">
          {technicalSkills.detailedSkills.map((skill, index) => (
            <li key={index}>{t(skill)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-zinc-500">
          {t(efficiencySkills.skillOrientation)}
        </h2>
        <ul className="list-disc list-inside pb-12 pl-5 pt-5 text-sm space-y-1">
          {efficiencySkills.detailedSkills.map((skill, index) => (
            <li key={index}>{t(skill)}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const skillsRight = (
    <div>
      <h2 className="text-zinc-500">
        {t(interpersonalSkills.skillOrientation)}
      </h2>
      <ul className="list-disc list-inside pb-12 pl-5 pt-5 text-sm space-y-1">
        {interpersonalSkills.detailedSkills.map((skill, index) => (
          <li key={index}>{t(skill)}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="skills" className="border-t border-zinc-700 ">
      <h1 className="text-xs font-semibold pt-5 pb-5">{t("skills.title")}</h1>
      <DefaultBodySection
        borderTop={false}
        leftContent={skillsLeft}
        rightContent={skillsRight}
      />
    </section>
  );
};

export default SkillsSection;

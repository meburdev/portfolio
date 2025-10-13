import React from "react";
import { useTranslation } from "next-i18next";
import DefaultBodySection from "@/components/DefaultBodySection";
import { MOCK_EDUCATION } from "@/data/education";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation("common");

  const midPoint = Math.ceil(MOCK_EDUCATION.length / 2);
  const educationItemsLeft = MOCK_EDUCATION.slice(0, midPoint);
  const educationItemsRight = MOCK_EDUCATION.slice(midPoint);

  const educationLeft = (
    <div>
      <ul className="list-inside pb-12 text-sm font-inter">
        {educationItemsLeft.map((element, index) => (
          <li key={element.id || index}>
            <div>{t(element.name)}</div>
            <div>{t(element.institution)}</div>
          </li>
        ))}
      </ul>
    </div>
  );

  const educationRight = (
    <div>
      <ul className="list-inside pb-12 text-sm font-inter">
        {educationItemsRight.map((educationItem, index) => (
          <li key={educationItem.id || index}>
            <div>{t(educationItem.name)}</div>
            <div>{t(educationItem.institution)}</div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="skills" className="border-t border-zinc-700 font-inter">
      <h1 className="text-xs font-semibold pt-5 pb-10 ">
        {t("certifications.title")}
      </h1>
      <DefaultBodySection
        borderTop={false}
        leftContent={educationLeft}
        rightContent={educationRight}
      />
    </section>
  );
};

export default SkillsSection;

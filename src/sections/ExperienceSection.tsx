import React from "react";
import { useTranslation } from "next-i18next";
import DefaultBodySection from "@/components/DefaultBodySection";
import { MOCK_EXPERIENCE } from "@/data/experience"; // Carga los datos mock

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation("common");

  const experienceItems = [] as Array<{
    companyInfo: React.ReactNode;
    workDoneInfo: React.ReactNode;
  }>;

  MOCK_EXPERIENCE.forEach((element) => {
    const companyInfo = (
      <div className="text-sm">
        <div className="font-extrabold">{element.company}</div>
        <div className="py-5 font-semibold text-zinc-500">
          <div>{t(element.position)}</div>
          <div>{element.companyLocation}</div>
          <div>{t(element.duration)}</div>
        </div>
      </div>
    );
    const workDoneInfo = (
      <div>
        <ul className="list-disc list-inside space-y-2">
          {element.functions.map((func, index) => (
            <li key={index}>{t(func)}</li>
          ))}
        </ul>
        <div className="text-sm pt-5">
          <span className="font-semibold">{t("skills-include")}: </span>
          {element.technologies.join(", ")}
        </div>
      </div>
    );

    experienceItems.push({ companyInfo, workDoneInfo });
  });

  return (
    <section id="experience" className="border-t border-zinc-700">
      <h1 className="text-xs font-extrabold pt-5 pb-10">
        {t("experience.title")}
      </h1>
      {experienceItems.map((element, index) => (
        <DefaultBodySection
          key={index}
          leftContent={element.companyInfo}
          rightContent={element.workDoneInfo}
        />
      ))}
    </section>
  );
};

export default ExperienceSection;

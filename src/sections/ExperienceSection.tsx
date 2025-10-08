import React from "react";
import { useTranslation } from "next-i18next";
import DefaultBodySection from "@/components/DefaultBodySection";
import { MOCK_EXPERIENCE } from "@/data/experience"; // Carga los datos mock

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation("common");

  const companyInfoBitecla = (
    <div className="text-sm">
      <div className="font-extrabold">Experience</div>
      <div className="py-5 font-semibold text-zinc-500">
        <div>Senior Producer at Bitecla</div>
        <div>Senior Producer at Bitecla</div>
        <div>Senior Producer at Bitecla</div>
      </div>
    </div>
  );
  const workDoneInfoBitecla = (
    <div>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          repudiandae dolorem dolor maiores laborum ea cumque incidunt alias,
          quasi animi deserunt dolores expedita aliquam! Culpa porro veritatis
          vel aut consequuntur
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro
          veritatis vel aut consequuntur
        </li>
      </ul>
    </div>
  );

  const companyInfoZippitech = (
    <div className="text-sm">
      <div className="font-extrabold">Experience</div>
      <div className="py-5 font-semibold text-zinc-500">
        <div>Senior Producer at Bitecla</div>
        <div>Senior Producer at Bitecla</div>
        <div>Senior Producer at Bitecla</div>
      </div>
    </div>
  );
  const workDoneInfoZippitech = (
    <div>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          repudiandae dolorem dolor maiores laborum ea cumque incidunt alias,
          quasi animi deserunt dolores expedita aliquam! Culpa porro veritatis
          vel aut consequuntur
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro
          veritatis vel aut consequuntur
        </li>
      </ul>
    </div>
  );

  const companyInfoCorpoelec = (
    <div className="text-sm">
      <h2 className="font-extrabold">Experience</h2>
      <div className="py-5 font-semibold text-zinc-500">
        <div>Senior Producer at Bitecla</div>
        <div>Senior Producer at Bitecla</div>
        <div>Senior Producer at Bitecla</div>
      </div>
    </div>
  );
  const workDoneInfoCorpoelec = (
    <div>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          repudiandae dolorem dolor maiores laborum ea cumque incidunt alias,
          quasi animi deserunt dolores expedita aliquam! Culpa porro veritatis
          vel aut consequuntur
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro
          veritatis vel aut consequuntur
        </li>
      </ul>
    </div>
  );

  return (
    <section id="experience" className="border-t border-zinc-700">
      <h1 className="text-xs font-extrabold pt-5 pb-10">{t("experience")}</h1>
      <DefaultBodySection
        leftContent={companyInfoBitecla}
        rightContent={workDoneInfoBitecla}
      />

      <DefaultBodySection
        leftContent={companyInfoZippitech}
        rightContent={workDoneInfoZippitech}
      />

      <DefaultBodySection
        leftContent={companyInfoCorpoelec}
        rightContent={workDoneInfoCorpoelec}
      />
    </section>
  );
};

export default ExperienceSection;

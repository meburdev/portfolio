import React from "react";
import { useTranslation } from "next-i18next";
import DefaultBodySection from "@/components/DefaultBodySection";
import { MOCK_EDUCATION } from "@/data/education";
import Link from "next/link";
import { useRouter } from "next/router";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const midPoint = Math.ceil(MOCK_EDUCATION.length / 2);
  const educationItemsLeft = MOCK_EDUCATION.slice(0, midPoint);
  const educationItemsRight = MOCK_EDUCATION.slice(midPoint);

  const educationLeft = (
    <div>
      <ul className="space-y-3 font-sans text-base">
        {educationItemsLeft.map((educationItem, index) => (
          <li key={index} className="items-start font-inter">
            <Link
              href={`/api/preview?file=${educationItem.docName}&lng=${locale}&preview=true`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="hover:text-white hover:text-glow-yellow-lg">
                {t(educationItem.name)}
              </div>
              <div className="text-xs text-zinc-500">
                {t(educationItem.institution)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const educationRight = (
    <div>
      <ul className="space-y-3 font-sans text-base">
        {educationItemsRight.map((educationItem, index) => (
          <li
            key={index}
            className="items-start font-inter transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Link
              href={`/api/preview?file=${educationItem.docName}&lng=${locale}&preview=true`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="hover:text-white hover:text-glow-yellow-lg">
                {t(educationItem.name)}
              </div>
              <div className="text-xs text-zinc-500">
                {t(educationItem.institution)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="skills" className="border-t border-zinc-700 font-inter pb-12">
      <h1 className="text-xs font-semibold pt-5 pb-5 ">
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

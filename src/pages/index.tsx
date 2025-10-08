import ExperienceSection from "@/sections/ExperienceSection";
import SkillsSection from "@/sections/SkillsSection";
import EducationSection from "@/sections/EducationSection";
import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const HomePage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <div className="w-full text-2xl font-semibold">{t("contact-me")}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      // Carga el archivo common.json para el idioma detectado o el idioma por defecto ('en')
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default HomePage;

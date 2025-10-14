import ExperienceSection from "@/sections/ExperienceSection";
import SkillsSection from "@/sections/SkillsSection";
import EducationSection from "@/sections/EducationSection";
import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const HomePage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <div className="w-full text-2xl font-semibold">
        <Link
          href="https://wa.me/584169711833"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("contact-me")}
        </Link>
      </div>
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

export type ExperienceItem = {
  id: number;
  company: string;
  companyUrl?: string;
  position: string;
  startDate: string;
  endDate: string | null;
  technologies: string[];
  companyLocation: string;
  duration: string;
  subcontractedFor?: string;
  logroCuantificable?: string;
  impacto?: string;
  functions: string[];
  logro?: string;
};

export type ExperienceData = ExperienceItem[];

export type SkillItem = {
  id: number;
  skillOrientation: string;
  description: string;
  detailedSkills: string[];
};

export type SkillData = SkillItem[];

export type EducationItem = {
  id: number;
  name: string;
  institution: string;
  year: string;
  docName: string;
};

export type EducationData = EducationItem[];

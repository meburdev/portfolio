/** Define el tipo para un solo elemento de experiencia laboral */
export type ExperienceItem = {
  id: number;
  company: string;
  companyUrl?: string; 
  position: string;
  startDate: string;
  endDate: string | null; 
  descriptionKey: string; 
  technologies: string[];
};

/** Define el tipo para el conjunto de toda la experiencia */
export type ExperienceData = ExperienceItem[];
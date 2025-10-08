import { ExperienceItem } from '@/types';
export const MOCK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    company: 'Empresa Demo S.L.',
    companyUrl: 'https://demo.com',
    position: 'Frontend Developer',
    startDate: '2021-08',
    endDate: '2024-03',
    descriptionKey: 'experience.demo_sl.desc', // Usaremos esta clave para i18n
    technologies: ['Vue.js', 'Vuex', 'Tailwind CSS', 'GraphQL'],
  },
  // Agrega más elementos aquí para probar el listado
];
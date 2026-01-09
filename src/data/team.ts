import { TeamMember } from '../types/team';
import Advogado1 from '/assets/Advogado1.jpeg';
import Advogado2 from '/assets/Advogada2.jpeg';

export const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Valdison da Anunciação Pereira',
    role: 'Sócio',
    specialty: ['Direito Penal', 'Direito Previdenciário', 'Direito Trabalhista', 'Ato Infracional'],
    image: Advogado1,
    bio: 'OAB/SP 398.623. Advogado com atuação estratégica na defesa de direitos, especializado em Direito Penal e Ato Infracional, além de forte expertise em contencioso Trabalhista e Previdenciário.',
    socials: {
      instagram: 'https://www.instagram.com/valdison.pereira.adv?igsh=MTd0bXF3NWIzcDg0dw=='
    }
  },
  {
    name: 'Dra. Melissa Carla Silva',
    role: 'Sócia',
    specialty: ['Direito Civil', 'Direito de Família', 'Direitos Humanos', 'Violência Doméstica'],
    image: Advogado2,
    bio: 'OAB/SP 440.900. Advogada dedicada à justiça social e proteção jurídica. Especialista em Direito Civil e de Família, com atuação destacada em Direitos Humanos e no combate à Violência Doméstica.',
    socials: {
      instagram: 'https://www.instagram.com/melissacarla.adv?igsh=MXN0Nm45NTlvN2hheQ==',
      linkedin: 'https://www.linkedin.com/in/melissa-carla-silva-39ba82102/'
    }
  }
];

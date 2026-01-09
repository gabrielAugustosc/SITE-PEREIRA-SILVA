import { PracticeArea } from '../types/practiceArea';
import { Users2, Home, FileText, Gavel, Wallet, Shield } from 'lucide-react';

export const practiceAreas: PracticeArea[] = [
  {
    icon: Users2,
    title: 'Direito Trabalhista',
    description: 'Defesa de empresas e trabalhadores em questões trabalhistas e previdenciárias.'
  },
  {
    icon: Home,
    title: 'Direito de Família',
    description: 'Divórcio; inventário; regulamentação de guarda e convivência; alimentos.'
  },
  {
    icon: FileText,
    title: 'Direito Civil',
    description: 'Ações de indenização; contratos; responsabilidade civil; direito do consumidor.'
  },
  {
    icon: Gavel,
    title: 'Direito Penal',
    description: 'Defesa em processos criminais; consultoria e assessoria jurídica penal.'
  },
  {
    icon: Wallet,
    title: 'Direito Previdenciário',
    description: 'Aposentadorias; pensões; auxílios; planejamento previdenciário e revisões de benefícios.'
  },
  {
    icon: Shield,
    title: 'Direitos Humanos',
    description: 'Combate à discriminação; defesa de minorias; proteção contra abusos de autoridade e garantias fundamentais.'
  }
];

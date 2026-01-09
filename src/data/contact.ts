import { ContactInfo } from '../types/contact';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: 'Endereço',
    content: 'Em breve divulgaremos nosso endereço físico.'
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: '(11) 99823-7397\n(11) 98420-8056'
  },
  {
    icon: Mail,
    title: 'E-mail',
    content: 'advocaciapereiraesilvasp@gmail.com\nvaldison_2008@hotmail.com\nmelissa.carla@hotmail.com'
  },
  {
    icon: Clock,
    title: 'Horário',
    content: 'Segunda a Sexta: 9h às 18h'
  }
];

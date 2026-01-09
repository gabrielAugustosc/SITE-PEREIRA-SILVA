import { LucideIcon } from 'lucide-react';

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

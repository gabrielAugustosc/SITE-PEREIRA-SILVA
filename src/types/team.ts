export interface TeamMember {
  name: string;
  role: string;
  specialty: string[];
  image: string;
  bio: string;
  socials: {
    instagram?: string;
    linkedin?: string;
  };
}

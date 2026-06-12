export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: { label: string; href: string }[];
  resumePath: string;
  openToWork: boolean;
  stat: { value: string; label: string };
}
export interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
}
export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
  highlight?: string;
}
export interface SkillGroup {
  group: string;
  items: string[];
}
export interface EducationItem {
  school: string;
  degree: string;
  detail: string;
  period: string;
}
export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

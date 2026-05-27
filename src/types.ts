export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skillsUsed: string[];
  category: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade?: string;
  focus: string[];
  details: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  longDescription: string;
  simulatable: boolean;
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; proficiency: number }[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface LinkedInUpdate {
  id: string;
  author: {
    name: string;
    headline: string;
    avatarUrl: string;
  };
  timeAgo: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  hasLiked?: boolean;
}


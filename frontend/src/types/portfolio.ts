export interface Profile {
  id: number;
  full_name: string;
  primary_title: string;
  brand_slogan: string;
  email: string;
  phone: string;
  location: string;
  short_bio: string;
  full_about: string;
  portrait_url: string;
  is_active: boolean;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  display_label: string;
  icon_name: string;
  display_order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  score?: string;
  completion_date: string;
  start_date?: string;
  description?: string;
  display_order: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  year: string;
  location?: string;
  bullet_points: string[];
  tech_tags?: string[];
  display_order: number;
}

export interface ProjectTechnology {
  id: number;
  name: string;
  category: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline?: string;
  year: string;
  organization: string;
  description: string;
  problem: string;
  solution: string;
  contribution: string;
  measurable_results?: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  display_order: number;
  primary_category: "AI" | "DATA" | "IoT" | "SOFTWARE" | string;
  technologies: ProjectTechnology[];
}

export interface Skill {
  id: number;
  name: string;
  icon_slug?: string;
  is_featured: boolean;
  display_order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
  skills: Skill[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issue_date?: string;
  credential_id?: string;
  verification_url?: string;
  image_url?: string;
  pdf_url?: string;
  is_featured: boolean;
  category: string;
  display_order: number;
}

export interface Achievement {
  id: number;
  title: string;
  event: string;
  year: string;
  description: string;
  category: string;
  display_order: number;
}

export interface Hackathon {
  id: number;
  title: string;
  role_or_focus: string;
  year: string;
  description: string;
  display_order: number;
}

export interface Activity {
  id: number;
  title: string;
  role: string;
  year: string;
  description: string;
  display_order: number;
}

export interface Resume {
  id: number;
  title: string;
  filename: string;
  file_path: string;
  is_primary: boolean;
  uploaded_at?: string;
}

export interface PortfolioData {
  profile: Profile;
  social_links: SocialLink[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skill_categories: SkillCategory[];
  certifications: Certification[];
  achievements: Achievement[];
  hackathons: Hackathon[];
  activities: Activity[];
  resume: Resume | null;
}

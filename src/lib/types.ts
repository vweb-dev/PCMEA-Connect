export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
}

export interface AppEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
}

export interface Member {
  id: string;
  name: string;
  company: string;
  companyLogoUrl: string;
  phone: string;
  email: string;
  avatarUrl: string;
  bio: string;
  specialties: string[];
}

export interface Resource {
  id: string;
  name: string;
  categories: string[];
  keywords: string[];
  summary: string;
  uploadDate: string;
}

export interface RugEncyclopediaEntry {
  id: string;
  name: string;
  origin: string;
  description: string;
  imageUrl: string;
  characteristics: {
    material: string;
    knot: string;
    design: string;
  };
}

export interface BoardMember {
  id: string;
  name: string;
  position: string;
  company: string;
  avatarUrl: string;
}

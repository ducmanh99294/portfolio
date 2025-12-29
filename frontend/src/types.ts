export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  type: string;
  value: string;
  icon: string;
}
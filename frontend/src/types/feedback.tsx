export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
  tags: string[];
  date: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  client: string;
  duration: string;
}
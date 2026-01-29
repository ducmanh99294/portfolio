export interface ProductDetail {
  id: number;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  price: number;
  images: string[];
  has3D: boolean;
  model3d: string;
  fileFormat: string;
  fileSize: string;
  polyCount: string;
  dimensions: string;
  weight: string;
  materials: string[];
  colors: string[];
  features: string[];
  softwareCompatible: string[];
  rating: number;
  reviewCount: number;
  downloadCount: number;
  lastUpdated: string;
  tags: string[];
  relatedProducts: number[];
}
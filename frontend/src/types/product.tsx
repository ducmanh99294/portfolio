export interface Product3D {
  _id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  images: string;
  has3D: boolean;
  model3d?: string; // URL to 3D file
  dimensions: string;
  materials: string[];
  tags: string[];
  rating: number;
  downloadCount: number;
  sellCount: number;
  fileSize?: string;
  fileFormat?: string;
}
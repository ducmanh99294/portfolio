export interface CartItem {
  id: number;
  productId: number;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  type: 'physical' | '3d-model';
  fileFormat?: string;
  fileSize?: string;
  dimensions?: string;
  materials?: string[];
}

export interface SavedItem {
  id: number;
  productId: number;
  name: string;
  category: string;
  images: string[];
  price: number;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
  savedItems: SavedItem[];
  discountCode: string;
  discountAmount: number;
  shippingCost: number;
  taxRate: number;
}
export interface ProductSpec {
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  categorySlug: string;
  categoryName: string;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  image: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  liftingCapacity?: string;
  operatingPressure?: string;
  warranty?: string;
  modelName?: string;
  functionType?: string;
  minOrderQty?: string;
  application?: string;
  specs: ProductSpec;
  features: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  displayOrder: number;
  icon: string;
  heroImage: string;
  productCount?: number;
}

export interface Client {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
  displayOrder: number;
  highlight?: string;
}

export interface InquiryFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productInterest?: string;
  capacityRequirement?: string;
  message: string;
}

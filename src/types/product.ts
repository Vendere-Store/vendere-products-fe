export interface ProductsApiResponse {
  data: Product[];
  message: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  href: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  images: Image[];
  colors: Color[];
  sizes: Size[];
  highlights: [];
  details: string;
}

export interface Breadcrumb {
  id: number;
  name: string;
  href: string;
}

export interface Image {
  id: number;
  src: string;
  alt: string;
}

export interface Color {
  id: number;
  name: string;
  class: string;
  selectedClass: string;
}

export interface Size {
  id: number;
  name: string;
  inStock: boolean;
}

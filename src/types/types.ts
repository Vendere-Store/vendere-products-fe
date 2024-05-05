export interface Category {
  name: string;
  href: string;
}

export interface Filters {
  id: string;
  name: string;
  options: FilterOptions[];
}

export interface FilterOptions {
  value: string;
  label: string;
  checked: boolean;
}

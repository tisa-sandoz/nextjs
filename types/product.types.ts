export interface ProductPayload {
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;

  isLoading: boolean;
  error: string | null;

  // COMMON
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;

  // ADMIN ONLY (RBAC controlled in UI/backend)
  createProduct: (data: ProductPayload) => Promise<ActionResponse>;
  updateProduct: (id: string, data: ProductPayload) => Promise<ActionResponse>;
  deleteProduct: (id: string) => Promise<ActionResponse>;
}

export interface Product {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface ActionResponse {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
}

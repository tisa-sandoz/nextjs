import { create } from "zustand";
import axios from "axios";
import { productService } from "@/services/product.service";
import {
  ProductState,
  ProductPayload,
  ActionResponse,
} from "@/types/product.types";

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,

  isLoading: false,
  error: null,

  // 🔹 Fetch all products
  fetchProducts: async () => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const res = await productService.getProducts();

      set({
        products: res.products,
        isLoading: false,
      });
    } catch (error: unknown) {
      let message = "Failed to fetch products";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      set({
        isLoading: false,
        error: message,
      });
    }
  },

  // 🔹 Fetch single product
  fetchProductById: async (id: string) => {
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const res = await productService.getProductById(id);

      set({
        selectedProduct: res.product,
        isLoading: false,
      });
    } catch (error: unknown) {
      let message = "Failed to fetch product";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      set({
        isLoading: false,
        error: message,
      });
    }
  },

  // 🔹 Create product (ADMIN)
  createProduct: async (data: ProductPayload): Promise<ActionResponse> => {
    if (get().isLoading) {
      return { success: false, message: "Request already in progress" };
    }

    set({ isLoading: true });

    try {
      const res = await productService.createProduct(data);

      set((state) => ({
        products: [...state.products, res.product],
        isLoading: false,
      }));

      return { success: true };
    } catch (error: unknown) {
      let message = "Failed to create product";
      let fieldErrors: Record<string, string> | undefined;

      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        message = data?.message || message;
        fieldErrors = data?.errors;
      }

      set({ isLoading: false });

      return { success: false, message, fieldErrors };
    }
  },

  // 🔹 Update product (ADMIN)
  updateProduct: async (
    id: string,
    data: ProductPayload
  ): Promise<ActionResponse> => {
    if (get().isLoading) {
      return { success: false, message: "Request already in progress" };
    }

    set({ isLoading: true });

    try {
      const res = await productService.updateProduct(id, data);

      set(() => ({
        isLoading: false,
      }));

      return { success: true };
    } catch (error: unknown) {
      let message = "Failed to update product";
      let fieldErrors: Record<string, string> | undefined;

      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        message = data?.message || message;
        fieldErrors = data?.errors;
      }

      set({ isLoading: false });

      return { success: false, message, fieldErrors };
    }
  },

  // 🔹 Delete product (ADMIN)
  deleteProduct: async (id: string): Promise<ActionResponse> => {
    if (get().isLoading) {
      return { success: false, message: "Request already in progress" };
    }

    set({ isLoading: true });

    try {
      await productService.deleteProduct(id);

      set(() => ({
        isLoading: false,
      }));

      return { success: true };
    } catch (error: unknown) {
      let message = "Failed to delete product";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      set({ isLoading: false });

      return { success: false, message };
    }
  },
}));
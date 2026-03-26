import { ProductPayload } from "@/types/product.types";
import { api } from "@/utils/axios";

export const productService = {
  // 🔹 CREATE (ADMIN)
  createProduct: async (data: ProductPayload) => {
    const response = await api.post("/product", data);
    return response.data;
  },

  // 🔹 GET ALL
  getProducts: async () => {
    const response = await api.get("/product");
    return response.data;
  },

  // 🔹 GET BY ID
  getProductById: async (id: string) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
  },

  // 🔹 UPDATE (ADMIN)
  updateProduct: async (id: string, data: ProductPayload) => {
    const response = await api.put(`/product/${id}`, data);
    return response.data;
  },

  // 🔹 DELETE (ADMIN)
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  },
};

import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

axios.defaults.withCredentials = true;

export const useProductStore = create(set => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/products`);
      console.log(response);
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data.message || "Error fetching products" });
    }
  },

  fetchProductById: async id => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      set({ product: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data.message || "Error fetching product" });
    }
  },
}));

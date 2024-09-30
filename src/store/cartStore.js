import { create } from "zustand";
import axios from "axios";
import { API_URL } from "./authStore";

export const useCartStore = create(set => ({
  cartItems: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cart`);
      set({ cartItems: response.data.cart.items, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Failed to fetch cart items", isLoading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/cart/add`, { productId, quantity });
      set(state => ({ cartItems: [...state.cart, response.data.cart], isLoading: false }));
    } catch (error) {
      set({ error: error.response.data.message || "Failed to add to cart", isLoading: false });
    }
  },

  removeFromCart: async cartItemId => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/cart/remove/${cartItemId}`);
      set(state => ({
        cartItems: state.cartItems.filter(item => item._id !== cartItemId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.response.data.message || "Failed to remove from cart", isLoading: false });
    }
  },

  updateCartQuantity: async (productId, newQuantity) => {
    set(state => ({
      cartItems: state.cartItems.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    }));

    try {
      const response = await axios.put(`${API_URL}/cart/update`, { productId, quantity: newQuantity });
      // After successful API call, update the cart with the latest data
      set({ cartItems: response.data.cart.items });
    } catch (error) {
      set({ error: error.response.data.message || "Failed to update cart item quantity" });
      // If the API request fails, rollback the UI update by reverting to the previous quantity
      set(state => ({
        cartItems: state.cartItems.map(item =>
          item.product._id === productId ? { ...item, quantity: item.quantity } : item,
        ),
      }));
    }
  },
}));

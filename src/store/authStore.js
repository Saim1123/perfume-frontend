import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

axios.defaults.withCredentials = true;

export const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isVerified: false,

  signup: async (firstName, lastName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { firstName, lastName, email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async code => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, { code });
      set({ user: response.data.user, isVerified: true, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message || "Error verify email", isLoading: false });
      console.log(error.message);
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ error: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },
}));

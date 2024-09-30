import { create } from "zustand";
import axios from "axios";

export const API_URL = "http://localhost:5000/api/v1";

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

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message || "Error on login", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      set({ error: error.response.data.message || "Error on logout", isLoading: false });
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
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isVerified: response.data.user.isVerified,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },

  forgotPassword: async email => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error sending reset link", isLoading: false });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error resetting password", isLoading: false });
      throw error;
    }
  },
}));

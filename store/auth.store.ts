import { create } from "zustand";
import { authService } from "@/services/auth.service";
import { AuthState, loginpayload, User } from "@/types/auth.types";
import axios from "axios";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  signup: async (data) => {
    if (get().isLoading) {
      return { success: false, message: "Request already in progress" };
    }

    set({ isLoading: true });

    try {
      const res = await authService.signUp(data);

      set({
        isLoading: false,
      });

      return { success: true };
    } catch (error: unknown) {
      let message = "Something went wrong";
      let fieldErrors: Record<string, string> | undefined;

      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        message = data?.message || message;

        if (data?.errors) {
          fieldErrors = data.errors;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      set({ isLoading: false });

      return {
        success: false,
        message,
        fieldErrors,
      };
    }
  },

  // 🔥 NEW: Auth rehydration
  fetchUser: async () => {
    try {
      const res = await authService.getMe();

      set({
        user: res.user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  verifyOtp: async (data) => {
    if (get().isLoading) {
      return { success: false, message: "Request already in progress" };
    }

    set({ isLoading: true });

    try {
      await authService.verifyOtp(data);

      set({
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error: unknown) {
      let message = "Invalid OTP";
      let fieldErrors;

      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        message = data?.message || message;
        fieldErrors = data?.errors;
      }

      set({ isLoading: false });

      return { success: false, message, fieldErrors };
    }
  },
  login: async (data: loginpayload) => {
    if (get().isLoading) {
      return { success: false, message: "Request already in progress" };
    }

    set({ isLoading: true });

    try {
      const res = await authService.login(data);

      set({
        user: res.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error: unknown) {
      let message = "Login failed";
      let fieldErrors: Record<string, string> | undefined;

      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        message = data?.message || message;

        if (data?.errors) {
          fieldErrors = data.errors;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      set({ isLoading: false });

      return {
        success: false,
        message,
        fieldErrors,
      };
    }
  },
}));

import { loginpayload, Signuppayload } from "@/types/auth.types";
import { api } from "@/utils/axios";

export const authService = {
  signUp: async (data: Signuppayload) => {
    console.log("data", data);

    const res = await api.post("/auth/signup", data);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
  verifyOtp: async (data: { otp: string }) => {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  },
  login: async (data: loginpayload) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
};

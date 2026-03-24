export interface ActionResponse {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
}

export interface Signuppayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  signup: (data: Signuppayload) => Promise<ActionResponse>;
  fetchUser: () => Promise<void>;
  verifyOtp: (data: verifyOtpPayload) => Promise<ActionResponse>;
  login: (data: loginpayload) => Promise<ActionResponse>;
}

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface verifyOtpPayload {
  otp: string;
}

export interface loginpayload {
  email: string;
  password: string;
}

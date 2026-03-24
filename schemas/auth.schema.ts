import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP must be at most 6 digits"),
});

export const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(1, "enter passsword"),
});

export type signUpFormData = z.infer<typeof signupSchema>;
export type verifyOtpFormData = z.infer<typeof verifyOtpSchema>;
export type loginFormData = z.infer<typeof loginSchema>

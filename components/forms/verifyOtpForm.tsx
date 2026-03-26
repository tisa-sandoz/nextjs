"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpFormData, verifyOtpSchema } from "@/schemas/auth.schema";

export default function VerifyOtpForm() {
  const router = useRouter();

  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const isLoading = useAuthStore((s) => s.isLoading);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<verifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onSubmit = async (data: verifyOtpFormData) => {
    setServerError("");

    const res = await verifyOtp(data);
    if (!res.success) {
      // 🔥 If backend returns field-level errors
      if (res.fieldErrors?.otp) {
        setError("otp", {
          type: "server",
          message: res.fieldErrors.otp,
        });
      } else {
        // 🔥 General error
        setServerError(res.message || "Invalid OTP");
      }

      return;
    }

     await fetchUser();
    // ✅ Success → redirect
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text">Verify Identity</h2>
        <p className="text-gray-500 mt-2">We've sent a 6-digit code to your email.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="otp">One-Time Password</label>
          <input
            id="otp"
            type="text"
            placeholder="000000"
            {...register("otp")}
            className={`w-full px-4 py-3 rounded-xl border ${errors.otp || serverError ? 'border-red-500' : 'border-gray-200 dark:border-slate-700'} bg-transparent text-center text-2xl tracking-widest focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
          />
          {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>}
          {serverError && <p className="mt-1 text-xs text-red-500">{serverError}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full btn-primary py-3 text-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : "Verify OTP"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button type="button" className="text-primary font-bold hover:underline">Resend</button>
        </p>
      </form>
    </div>
  );
}

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* OTP Input */}
      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          {...register("otp")}
          className="border p-2 w-full"
        />

        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>

      {/* General Error */}
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}

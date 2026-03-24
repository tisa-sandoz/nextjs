"use client";

import { useAuthStore } from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUpFormData, signupSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpForm = () => {
  const router = useRouter();

  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<signUpFormData>({ resolver: zodResolver(signupSchema) });

  // ✅ Submit handler (CRITICAL)
  const onSubmit = async (data: signUpFormData) => {
    const res = await signup(data);
    if (res.success) {
      router.push("/verify-otp");
      return;
    }

    if (!res.success) {
      // 🔥 map backend errors → form
      if (res.fieldErrors) {
        Object.entries(res.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof signUpFormData, {
            type: "server",
            message,
          });
        });
      }
      return;
    }
    // ✅ success → redirect
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;

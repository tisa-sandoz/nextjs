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
    <div className="w-full max-w-md mx-auto mt-20 p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text">Create Account</h2>
        <p className="text-gray-500 mt-2">Join us to build something amazing today.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
          <input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-slate-700'} bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            {...register("email")}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-slate-700'} bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-slate-700'} bg-transparent focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
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
              Signing up...
            </span>
          ) : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-bold hover:underline">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;

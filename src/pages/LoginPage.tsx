import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { LoginValidation } from "../validation";
import { cn } from "../lib/utils";

const LoginPageValidation = LoginValidation.extend({
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginPageValidation>>({
    resolver: zodResolver(LoginPageValidation),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleFormSubmit = async (data: z.infer<typeof LoginPageValidation>) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="relative group">
          {/* Glow behind card */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-purple-500/20 to-green-500/20 rounded-2xl blur-xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Glass card */}
          <div className="relative bg-black/60 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl">
            {/* Logo + Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <img
                src="/assets/logo.png"
                alt="Social logo"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back to{" "}
                <span className="text-green-500 font-black">Social</span>
              </h1>
              <p className="text-gray-400 text-sm">Enter the club</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-5">
              {/* Server error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3"
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10",
                      focusedInput === "email" ? "text-green-400" : "text-gray-500"
                    )}
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 pl-12 pr-4 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder:text-gray-600 transition-all duration-300 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                    {...register("email", {
                      onBlur: () => setFocusedInput(null),
                    })}
                    onFocus={() => setFocusedInput("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-400 text-xs">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10",
                      focusedInput === "password" ? "text-green-400" : "text-gray-500"
                    )}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 pl-12 pr-12 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder:text-gray-600 transition-all duration-300 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                    {...register("password", {
                      onBlur: () => setFocusedInput(null),
                    })}
                    onFocus={() => setFocusedInput("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-400 transition-colors z-10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-red-400 text-xs">{errors.password.message}</p>
                )}
              </motion.div>

              {/* Remember me + Forgot */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex justify-between items-center"
              >
                <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-4 h-4 rounded border-white/20 bg-[#1A1A1A] text-green-500 focus:ring-green-500/20 focus:ring-2"
                    {...register("rememberMe")}
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <NavLink
                  to="/forgotPassword"
                  className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors"
                >
                  Forgot password?
                </NavLink>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 relative overflow-hidden"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Entering...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </motion.div>

              {/* Divider */}
              <div className="relative flex items-center my-2">
                <div className="flex-grow border-t border-white/10" />
                <span className="mx-4 text-xs text-gray-500">or continue with</span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              {/* Google SSO (disabled) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="button"
                  disabled
                  className="w-full h-12 bg-white/5 border border-white/10 text-gray-300 rounded-lg transition-all duration-200 opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                  title="Coming soon"
                >
                  <img
                    src="assets/google.svg"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </button>
              </motion.div>

              {/* Sign up link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center text-sm text-gray-400 mt-4"
              >
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-green-500 hover:text-green-400 font-semibold transition-colors"
                >
                  Sign up for free
                </NavLink>
              </motion.p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
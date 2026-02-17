import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { NavLink } from "react-router-dom";
import { SignUpValidation } from "../validation/index.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { cn } from "../lib/utils";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SignupPage = () => {
  const { signup, error, isLoading } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const password = watch("password");
  const confirmPassword = watch("confirm_password");
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const handleFormSubmit = async (data: z.infer<typeof SignUpValidation>) => {
    await signup(data.email, data.password, data.first_name, data.last_name);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
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
              className="text-center mb-6"
            >
              <img
                src="/assets/logo.png"
                alt="Social logo"
                className="w-32 h-32 mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-white mb-2">
                Join{" "}
                <span className="text-green-500 font-black">Social</span>
              </h1>
              <p className="text-gray-400 text-sm">Create your account and enter the club</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(handleFormSubmit)} noValidate className="space-y-4">
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

              {/* Name fields row */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="grid grid-cols-2 gap-3"
              >
                {/* First Name */}
                <div>
                  <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-400">
                    First Name
                  </label>
                  <div className="relative">
                    <User
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 z-10",
                        focusedInput === "first_name" ? "text-green-400" : "text-gray-500"
                      )}
                    />
                    <input
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      className="w-full h-12 pl-12 pr-4 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder:text-gray-600 transition-all duration-300 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                      {...register("first_name", {
                        onBlur: () => setFocusedInput(null),
                      })}
                      onFocus={() => setFocusedInput("first_name")}
                    />
                  </div>
                  {errors.first_name && (
                    <p className="mt-1 text-red-400 text-xs">{errors.first_name.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-400">
                    Last Name
                  </label>
                  <div className="relative">
                    <User
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 z-10",
                        focusedInput === "last_name" ? "text-green-400" : "text-gray-500"
                      )}
                    />
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Last Name"
                      className="w-full h-12 pl-12 pr-4 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder:text-gray-600 transition-all duration-300 outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                      {...register("last_name", {
                        onBlur: () => setFocusedInput(null),
                      })}
                      onFocus={() => setFocusedInput("last_name")}
                    />
                  </div>
                  {errors.last_name && (
                    <p className="mt-1 text-red-400 text-xs">{errors.last_name.message}</p>
                  )}
                </div>
              </motion.div>

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
                transition={{ delay: 0.35 }}
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
                    placeholder="Create a password"
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

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10",
                      focusedInput === "confirm_password" ? "text-green-400" : "text-gray-500"
                    )}
                  />
                  <input
                    id="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={cn(
                      "w-full h-12 pl-12 pr-12 bg-[#1A1A1A] border rounded-lg text-white placeholder:text-gray-600 transition-all duration-300 outline-none",
                      passwordsMatch
                        ? "border-green-500/50 ring-2 ring-green-500/20"
                        : "border-white/10 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                    )}
                    {...register("confirm_password", {
                      onBlur: () => setFocusedInput(null),
                    })}
                    onFocus={() => setFocusedInput("confirm_password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-400 transition-colors z-10"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    tabIndex={0}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="mt-1 text-red-400 text-xs">{errors.confirm_password.message}</p>
                )}
                {!errors.confirm_password && passwordsMatch && (
                  <p className="mt-1 text-green-500 text-xs flex items-center gap-1">
                    <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                    Passwords match
                  </p>
                )}
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-2"
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
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </motion.div>

              {/* Login link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-sm text-gray-400 mt-4"
              >
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-green-500 hover:text-green-400 font-semibold transition-colors"
                >
                  Login here
                </NavLink>
              </motion.p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

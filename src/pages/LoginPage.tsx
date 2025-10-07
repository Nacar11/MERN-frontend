import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoadingModal from "../components/modals/LoadingModal";
import { LoginValidation } from "../validation";

const LoginPageValidation = LoginValidation.extend({
  rememberMe: z.boolean().optional(),
});


const LoginPage = () => {
  const { login, error, isLoading } = useLogin();

  // Use the extended validation schema
  const form = useForm<z.infer<typeof LoginPageValidation>>({
    resolver: zodResolver(LoginPageValidation),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, // Set a default value for the checkbox
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof LoginPageValidation>) => {
    // The 'rememberMe' value is now available in 'data'
    console.log("Login Data:", data);
    await login(data.email, data.password);
  };

  return (
    <>
      {isLoading && <LoadingModal open={isLoading} />}

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl border border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* Added noValidate to prevent default browser validation */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <span className="mb-3 text-3xl font-bold">
                  Welcome back to{" "}
                  <span className="text-green-600 font-black">Social</span>
                </span>
                <span className="font-light text-gray-400 mb-8">
                  Please enter your details to login
                </span>

                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg p-3 mb-4" role="alert">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div className="py-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    // FIX: Use type="email" for better semantics and mobile UX
                    type="email"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="pt-1 text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="py-4">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="pt-1 text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between w-full py-4 mb-4">
                  <div className="flex items-center">
                    {/* IMPROVEMENT: Register the checkbox to capture its state */}
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2 mr-2"
                      {...register("rememberMe")}
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember for 30 days</label>
                  </div>
                  <NavLink
                    to="/forgotPassword"
                    className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                  >
                    Forgot password?
                  </NavLink>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>

                <button
                  // FIX: Added type="button" to prevent it from submitting the form
                  type="button"
                  disabled={true}
                  className="w-full mb-6 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 opacity-50 cursor-not-allowed"
                >
                  <img
                    src="assets/google.svg"
                    alt="Google logo" // IMPROVEMENT: More descriptive alt text
                    className="w-6 h-6 inline mr-2"
                  />
                  Sign in with Google
                </button>

                <div className="text-center text-gray-900">
                  Don't have an account?
                  {/* IMPROVEMENT: Cleaner spacing for the link */}
                  <NavLink to="/signup" className="font-semibold text-green-600 hover:text-green-500 ml-1">
                    Sign up for free
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
import { useSignup } from "../hooks/useSignup";
import { NavLink } from "react-router-dom";
import { SignUpValidation } from "../validation/index.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingModal from "../components/modals/LoadingModal";

const SignupPage = () => {
  const { signup, error, isLoading } = useSignup();

  const onSubmit = async (data: z.infer<typeof SignUpValidation>) => {
    console.log("Form Data:", data);
    await signup(data.email, data.password);
  };

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

  return (
    <>
      {isLoading && <LoadingModal open={isLoading} />}

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="md:bg-white md:shadow-xl md:rounded-2xl md:border md:border-gray-200">
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col justify-center p-4 md:p-8 lg:p-10">
            <span className="mb-3 text-3xl font-bold">
              Create new Account in{" "}
              <span className="text-green-600 font-black">Social</span>
            </span>
            <span className="font-light text-gray-400 mb-8">
              Please enter your details for the signup process
            </span>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg p-3 mb-4" role="alert">
                {error}
              </div>
            )}

            {/* First Name */}
            <div className="py-3">
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                id="first_name"
                type="text"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your first name"
                {...form.register("first_name")}
              />
              {form.formState.errors.first_name && (
                <p className="pt-1 text-red-500 text-sm">
                  {form.formState.errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="py-3">
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="last_name"
                type="text"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your last name"
                {...form.register("last_name")}
              />
              {form.formState.errors.last_name && (
                <p className="pt-1 text-red-500 text-sm">
                  {form.formState.errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="py-3">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="pt-1 text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="py-3">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="pt-1 text-red-500 text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="py-3">
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirm_password"
                type="password"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm your password"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="pt-1 text-red-500 text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
              {!errors.confirm_password && passwordsMatch && (
                <p className="pt-1 text-green-600 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Passwords match
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>

            <div className="text-center text-gray-900">
              Already Have an Account?
              <NavLink to="/login" className="font-semibold text-green-600 hover:text-green-500 ml-1">
                Login here
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

export default SignupPage;

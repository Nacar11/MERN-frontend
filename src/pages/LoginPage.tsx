import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoadingModal from "../components/modals/LoadingModal";
import { LoginValidation } from "../validation";

const LoginPage = () => {
  const { login, error, isLoading } = useLogin();
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof LoginValidation>) => {
    console.log("Login Data:", data);
    await login(data.email, data.password);
  };

  return (
    <>
      {isLoading && <LoadingModal open={isLoading} />}

      <div className="flex items-center justify-center bg-gray-100">
        <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:space-y-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-3xl font-bold">
                Welcome back to{" "}
                <span className="text-green-600 font-black">Social</span>
              </span>
              <span className="font-light text-gray-400 mb-8">
                Please enter your details to login
              </span>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {/* Email */}
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="textfield"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="pt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  className="textfield"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="pt-1 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between w-full py-4 mb-4">
                <div className="mr-24">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-md">Remember for 30 days</span>
                </div>
                <NavLink
                  to="/forgotPassword"
                  className="items-center mb-5 md:mb-0"
                >
                  <span className="font-semibold text-md hover:text-gray-700">
                    Forgot password
                  </span>
                </NavLink>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mb-6 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded"
              >
                Sign in
              </button>

              <button
                disabled={true}
                className="mb-6 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded"
              >
                <img
                  src="assets/google.svg"
                  alt="img"
                  className="w-6 h-6 inline mr-2"
                />
                Sign in with Google
              </button>

              <div className="text-center text-gray-900">
                Don't have an account?
                <NavLink to="/signup" className="items-center mb-5 md:mb-0">
                  <span className="text-green-600 font-semibold hover:text-green-500">
                    {" "}
                    Sign up for free
                  </span>
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

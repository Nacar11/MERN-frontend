import { FormEvent, useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { NavLink } from "react-router-dom"
import { SignUpValidation } from "../validation/index.tsx"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignupPage = () => {
  const {signup, error, isLoading} = useSignup()

  const onSubmit = async (data: z.infer<typeof SignUpValidation>) => {
    console.log("Form Data:", data)
    await signup(data.email, data.password)
  }

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  const {
    register,
    formState: { errors },
    watch,
  } = form

const password = watch("password");
const confirmPassword = watch("confirm_password");
const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="flex items-center justify-center bg-gray-100">
    <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:space-y-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="login">
      <div className="flex flex-col justify-center p-8 md:p-14">
        <span className="mb-3 text-3xl font-bold">
          Create new Account in <span className="text-green-600 font-black">Social</span>
        </span>
        <span className="font-light text-gray-400 mb-8">
          Please enter your details for the signup process
        </span>

        {/* First Name */}
        <div className="py-4">
          <span className="mb-2 text-md">First Name</span>
          <input
            type="text"
            className="textfield"
            {...form.register("first_name")}
          />
          {form.formState.errors.first_name && (
            <p className="pt-1 text-red-500 text-sm">{form.formState.errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="py-4">
          <span className="mb-2 text-md">Last Name</span>
          <input
            type="text"
            className="textfield"
            {...form.register("last_name")}
          />
          {form.formState.errors.last_name && (
            <p className="pt-1 text-red-500 text-sm">{form.formState.errors.last_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="py-4">
          <span className="mb-2 text-md">Email</span>
          <input
            type="email"
            className="textfield"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="pt-1 text-red-500 text-sm">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="py-4">
          <span className="mb-2 text-md">Password</span>
          <input
            type="password"
            className="textfield"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="pt-1 text-red-500 text-sm">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="py-4">
          <span className="mb-2 text-md">Confirm Password</span>
          <input
            type="password"
            className="textfield"
            {...register("confirm_password")}
          />
            {errors.confirm_password && (
              <p className="pt-1 text-red-500 text-sm">{errors.confirm_password.message}</p>
            )}
            {!errors.confirm_password && passwordsMatch && (
              <p className="text-green-600 text-sm">Passwords match </p>
            )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mb-6 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded"
        >
          Sign up
        </button>

        <div className="text-center text-gray-900">
          Already Have an Account?
          <NavLink to="/login" className="items-center mb-5 md:mb-0">
            <span className="text-green-600 font-semibold hover:text-green-500"> Login here</span>
          </NavLink>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </form>
    </div>
  </div>
  )
}

export default SignupPage
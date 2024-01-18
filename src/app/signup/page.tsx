"use client";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleNavigateToSignin = () => {
    router.push("/login");
  };
  const onSubmit = async (data: any) => {
    try {
      await authService.signup(data, handleNavigateToSignin);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-1 text-center text-6xl font-montserrat font-semibold leading-20 text-white">
          Sign up
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mt-1">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                id="email"
                type="email"
                name="email"
                required
                placeholder="Email"
                autoComplete="email"
                className={`block w-80 rounded-md py-2.5 pl-4 bg-custom-color shadow-sm ring-inset ring-gray-transparent focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder-gray-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.root?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Password"
                className={`block w-80 rounded-md py-2.5 pl-4 bg-custom-color shadow-sm ring-inset ring-gray-transparent focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder-gray-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.root?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="myCheckbox"
              className="form-checkbox h-4 w-4 text-yellow-500 bg-transparent focus:ring-yellow-500 border-gray-300 rounded-md checked:bg-red-500 checked:border-red-500 checked:text-red-500"
            />
            <p className="text-white text-center font-montserrat text-sm font-sm leading-6 ml-1">
              Remember me
            </p>
            <a
              className="ml-auto cursor-pointer"
              onClick={handleNavigateToSignin}
            >
              Signin?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-80 justify-center rounded-md bg-login-button px-3 py-2.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-custom-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

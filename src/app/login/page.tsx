"use client";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleNavigateToSignup = () => {
    router.push("/signup");
  };
  const handleNavigateToMovies = () => {
    router.push("/movies");
  }

  const onSubmit = async (data: any) => {
    try {
      await authService.signin(data, handleNavigateToMovies);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-1 text-center text-6xl font-montserrat font-semibold leading-20 text-white">
          Sign in
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mt-1">
              <input
                {...register("email", { required: "Email is required" })}
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                className="block w-80 rounded-md py-2.5 pl-4 bg-custom-color shadow-sm ring-inset ring-gray-transparent focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder-gray-300"
              />
              {errors.email && <span>{errors.root?.message}</span>}
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                className="block w-80 rounded-md py-2.5 pl-4 bg-custom-color shadow-sm ring-inset ring-gray-transparent focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder-gray-300"
              />
              {errors.password && <span>{errors.root?.message}</span>}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="myCheckbox"
              {...register("rememberMe")}
              className="form-checkbox h-4 w-4 text-yellow-500 bg-transparent focus:ring-yellow-500 border-gray-300 rounded-md checked:bg-red-500 checked:border-red-500 checked:text-red-500"
            />
            <p className="text-white text-center font-montserrat text-sm font-sm leading-6 ml-1">
              Remember me
            </p>
            <a
              className="ml-auto cursor-pointer"
              onClick={handleNavigateToSignup}
            >
              Signup?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-80 justify-center rounded-md bg-login-button px-3 py-2.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-custom-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

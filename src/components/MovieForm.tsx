/* eslint-disable @next/next/no-img-element */
"use client";
import { DropIcon } from "@/assets/DropIcon";
import {
  getS3SignedUrl,
  movieService,
  uploadImage,
} from "@/service/movie.service";
import { useRouter, useSearchParams } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface FormData {
  title: string;
  publishingYear: number;
  imageUrl: string;
}

interface MovieFormProps {
  editMode?: boolean;
  initialValues?: FormData;
}

const MovieForm: React.FC<MovieFormProps> = ({ editMode, initialValues }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (editMode && initialValues) {
      Object.entries(initialValues).forEach(([key, value]: any) => {
        setValue(key, value);
      });
    }
  }, [editMode, initialValues, setValue]);

  const handleNavigateToMovies = () => {
    router.push("/movies");
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const authToken: any = localStorage.getItem("token");
      const signedUrl = await getS3SignedUrl("image/jpeg", authToken);
      const url = signedUrl?.preSignedUrl.split("?Content-Type")[0];
      await uploadImage(signedUrl?.preSignedUrl, image, "image/jpeg");
      const key = signedUrl?.key;
      !editMode
        ? movieService.createMovie(
            { ...data, imageUrl: url },
            authToken,
            editMode!
          )
        : movieService.editMovie(
            { ...data, imageUrl: url },
            authToken,
            editMode!,
            id!
          );
      router.push("/movies");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="w-full sm:w-1/2 p-8 flex flex-col mt-8 ml-0 sm:ml-20">
        <h1 className="text-white font-montserrat text-4xl font-semibold tracking-wide mb-4 text-center sm:text-left whitespace-nowrap">
          {editMode ? "Edit" : "Create a new movie"}
        </h1>
        <div className="h-48 sm:w-48 bg-box-color rounded-lg border border-dotted border-white-600 mb-4 flex items-center justify-center mt-8 mx-auto sm:mx-0">
          <div className="flex flex-col items-center justify-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Poster"
                className="h-full w-full object-cover rounded-md"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  marginLeft: "3px",
                  marginRight: "3px  ",
                }}
              />
            )}
            {!selectedImage && <DropIcon className="h-24 w-24" />}
            <label htmlFor="upload" className="cursor-pointer">
              <p className="mt-1 text-white text-xs">
                {selectedImage ? "Change Image" : "Drop an image here"}
              </p>
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
      <div className="flex-grow p-8 flex flex-col mt-4 sm:mt-28 mx-auto sm:mx-32">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mt-1">
                <input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Title"
                  autoComplete="title"
                  name="title"
                  required
                  className={`block w-80 rounded-md py-2.5 pl-4 bg-custom-color text-white shadow-sm ring-inset ring-gray-transparent focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder-gray-300 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="publishingYear"
                  {...register("publishingYear", {
                    required: "Publishing year is required",
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Publishing year"
                  name="publishingYear"
                  required
                  className={`block w-48 font-montserrat rounded-md py-2.5 pl-4 bg-custom-color text-white shadow-sm ring-inset ring-gray-transparent focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder-gray-300 ${
                    errors.publishingYear ? "border-red-500" : ""
                  }`}
                />
                {errors.publishingYear && (
                  <span className="text-sm text-red-500">
                    {errors.publishingYear.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                className="text-white font-montserrat font-semibold rounded-lg border bg-transparent-600 inline-flex items-center justify-center h-11 w-40"
                onClick={handleNavigateToMovies}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white font-montserrat font-semibold rounded-lg bg-green-600 inline-flex items-center justify-center h-11 w-40"
              >
                {editMode ? "Update " : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;

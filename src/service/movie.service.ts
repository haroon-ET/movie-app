import toast from "react-hot-toast";
import { createHttpsClient } from "./https-client";

interface MovieData {
  title: string;
  publishingYear: number;
  imageUrl: string;
}

export const movieService = {
  createMovie: async (
    movieData: MovieData,
    authToken: string,
    editMode: boolean
  ) => {
    try {
      const httpClient = createHttpsClient(authToken);
      const response = await httpClient.post("/movies", movieData);
      toast.success(editMode ? "updated successfully" : "created Successfully");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  editMovie: async (
    movieData: MovieData,
    authToken: string,
    editMode: boolean,
    id: string
  ) => {
    try {
      const httpClient = createHttpsClient(authToken);
      const response = await httpClient.put(`/movies/${id}`, movieData);
      toast.success(editMode ? "updated successfully" : "created Successfully");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllMovies: async (authToken: string, offset: number, limit: number) => {
    try {
      const httpClient = createHttpsClient(authToken);
      const response = await httpClient.get("/movies", {
        params: { offset, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchMovieById: async (authToken: string, id: string) => {
    try {
      const httpClient = createHttpsClient(authToken);
      const response = await httpClient.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const getS3SignedUrl = async (
  contentType: string,
  accessToken: string
) => {
  try {
    const httpsClient = createHttpsClient(accessToken);
    const response = await httpsClient.get("/s3/image-signed-url", {
      params: {
        contentType,
      },
    });
    return response?.data;
  } catch (error: any) {
    toast.error(error ? error.Message : "error occured", { duration: 3000 });
  }
};

export const uploadImage = async (
  url: string,
  imageSrc: string,
  contentType: string
) => {
  try {
    const httpsClient = createHttpsClient();
    const response = await httpsClient.put(url, imageSrc, {
      headers: {
        "Content-Type": contentType,
      },
    });
    return response;
  } catch (error: any) {
    toast.error(error?.Message, { duration: 3000 });
  }
};

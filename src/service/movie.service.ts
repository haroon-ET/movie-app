import toast from "react-hot-toast";
import { createHttpsClient } from "./https-client";
import axios from "axios";

export const products = [
  {
    id: 1,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 6,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 7,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 8,
    name: "Movie 1",
    href: "#",
    year: "2021",
    imageSrc: "/images/poster1.png",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

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
    editMode: boolean
  ) => {
    try {
      const httpClient = createHttpsClient(authToken);
      const response = await httpClient.put("/movies", movieData);
      toast.success(editMode ? "updated successfully" : "created Successfully");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllMovies: async (authToken: string) => {
    try {
      const httpClient = createHttpsClient(authToken);
      const response = await httpClient.get("/movies");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const getS3SignedUrl = async (contentType: string, accessToken: string) => {
  try {
    const httpsClient = createHttpsClient(accessToken);
    const response = await httpsClient.get("/s3/image-signed-url", {
      params: {
        contentType,
      },
    });
    return response?.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error ? error.Message : "error occured", { duration: 3000 });
  }
};

export const uploadImage = async (
  url: string,
  imageSrc: string,
  contentType: string
) => {
  try {
    const response = await axios.put(url, imageSrc, {
      headers: {
        "Content-Type": contentType,
      },
    });
    return response;
  } catch (error: any) {
    toast.error(error?.Message, { duration: 3000 });
  }
};

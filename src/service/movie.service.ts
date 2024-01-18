import toast from "react-hot-toast";
import { createHttpsClient } from "./https-client";

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
    } catch (error) {
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
};

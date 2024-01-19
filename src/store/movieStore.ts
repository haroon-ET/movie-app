import { create } from 'zustand';

interface MovieData {
    title: string;
    publishingYear: number;
    imageUrl: string;
}

interface MovieStore {
  movies: MovieData[];
  setMovies: (movies: MovieData[]) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
}));

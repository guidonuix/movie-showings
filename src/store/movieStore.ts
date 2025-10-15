import { create } from "zustand";
import type { MovieType } from "../types/types";

interface IMovieStore {
  movies: MovieType[];
  setMovies: (movies: MovieType[]) => void;
  selectedDate?: Date;
  setSelectedDate: (date: Date) => void;
}

export const useMoviesStore = create<IMovieStore>((set) => ({
  movies: [] as MovieType[],
  setMovies: (movies: MovieType[]) => set((movie) => ({ ...movie, movies })),
  selectedDate: new Date("2025-10-12T10:00:00.000Z"),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}));

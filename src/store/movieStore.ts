import { create } from "zustand";
import type { MovieProps } from "../types/types";

interface IMovieStore {
  movies: MovieProps[];
  setMovies: (movies: MovieProps[]) => void;
  selectedDate?: Date;
  setSelectedDate: (date: Date) => void;
}

export const useMoviesStore = create<IMovieStore>((set) => ({
  movies: [] as MovieProps[],
  setMovies: (movies: MovieProps[]) => set((movie) => ({ ...movie, movies })),
  selectedDate: new Date("2025-10-12T10:00:00.000Z"),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}));

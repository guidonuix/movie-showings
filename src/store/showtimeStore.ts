import {create} from 'zustand'
import type {ShowtimeType} from '../types/types'

export const useShowtimeStore = create<{
  showtimes: ShowtimeType[];
  setShowtimes: (showtimes: ShowtimeType[]) => void;
}>((set) => ({
  showtimes: [],
  setShowtimes: (showtimes) => set({ showtimes }),
}));
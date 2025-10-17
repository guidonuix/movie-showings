import {create} from 'zustand'

interface SelectedTheaterState {
  selectedTheaterId: number | null;
  setSelectedTheaterId: (id: number) => void;
}

export const useSelectedTheaterStore = create<SelectedTheaterState>((set) => ({
  selectedTheaterId: null,
  setSelectedTheaterId: (id) => set({ selectedTheaterId: id }),
}));
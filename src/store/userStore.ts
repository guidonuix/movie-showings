import { create } from "zustand";
import type { UserType } from "../types/types";

interface IUserStore {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: UserType | null) => set(() => ({ user })),
}));

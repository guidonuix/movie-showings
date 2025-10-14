import { create } from "zustand";
import type { CartItem } from "../types/types";

interface ICartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (filmId: number, showingTime: string) => void;
  clearCart: () => void;
}
export const useCartStore = create<ICartStore>((set) => ({
  cart: [] as CartItem[],
  addToCart: (item: CartItem) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (filmId: number, showingTime: string) =>
    set((state) => ({
      cart: state.cart.filter(
        (cartItem) =>
          !(cartItem.filmId === filmId && cartItem.showingTime === showingTime)
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));
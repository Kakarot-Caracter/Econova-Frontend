import { create } from "zustand";

type FavoriteState = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

// Helper para sincronizar con localStorage
const loadFromStorage = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
};

export const useFavoritesStore = create<FavoriteState>((set, get) => ({
  favorites: typeof window !== "undefined" ? loadFromStorage() : [],
  toggleFavorite: (id) => {
    const current = get().favorites;
    const exists = current.includes(id);
    const updated = exists ? current.filter((f) => f !== id) : [...current, id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },
  isFavorite: (id) => get().favorites.includes(id),
}));

import { create } from "zustand";

type FavoriteState = {
  isOpenUserDialog: boolean;
  setIsOpenUserDialog: (isOpen: boolean) => void;
};

export const useUserDialog = create<FavoriteState>((set, get) => ({
  isOpenUserDialog: false,
  setIsOpenUserDialog: (isOpen: boolean) => set({ isOpenUserDialog: isOpen }),
}));

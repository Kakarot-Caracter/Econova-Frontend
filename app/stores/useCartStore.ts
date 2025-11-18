import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../shared/interfaces/product.interface";

type ProductId = Pick<Product, "id">;

type CartItem = ProductId & {
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  isOpenCarrito: boolean; // <- Estado del carrito abierto/cerrado
  setIsOpenCarrito: (open: boolean) => void; // <- Función para actualizarlo
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpenCarrito: false, // <- inicializamos cerrado
      setIsOpenCarrito: (open: boolean) => set({ isOpenCarrito: open }), // <- setter

      addItem: (id: string, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { id, quantity }] };
        }),

      removeItem: (id: string) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),

      updateQuantity: (id: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
    }),
    {
      name: "cart-storage", // key en localStorage
    },
  ),
);

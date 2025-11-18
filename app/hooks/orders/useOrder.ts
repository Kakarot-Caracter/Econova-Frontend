import { useQuery } from "@tanstack/react-query";
import { Order } from "@/app/shared/interfaces/order.interface";

export const useOrder = () =>
  useQuery<Order[], Error>({
    queryKey: ["orders", "user"],
    queryFn: async () => {
      const res = await fetch(`/api/orders`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Error al obtener las órdenes del usuario");
      }

      return await res.json();
    },
  });

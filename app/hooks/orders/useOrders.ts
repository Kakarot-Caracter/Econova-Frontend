import { useQuery } from "@tanstack/react-query";
import { Order } from "@/app/shared/interfaces/order.interface";

export const useOrders = () =>
  useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`/api/orders/all`, {
        credentials: "include",
      });

      return await res.json();
    },
  });

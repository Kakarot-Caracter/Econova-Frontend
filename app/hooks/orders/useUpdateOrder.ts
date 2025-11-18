import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderStatus } from "@/app/shared/interfaces/order.interface";

interface UpdateOrderData {
  status: OrderStatus;
}

export const useUpdateOrder = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateOrderData) => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar la orden");
      }

      return await res.json();
    },
    onSuccess: () => {
      // Invalida y refetch de las órdenes
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Error actualizando orden:", error);
    },
  });
};

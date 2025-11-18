import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar la orden");
      }

      return await res.json();
    },
    onSuccess: () => {
      // Invalida y refetch de las órdenes
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Error eliminando orden:", error);
    },
  });
};

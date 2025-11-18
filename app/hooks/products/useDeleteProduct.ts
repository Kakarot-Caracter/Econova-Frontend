import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el producto");
      }
    },
    onSuccess: (_, id) => {
      // Invalida la lista de productos para refrescarla
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Remueve el producto específico del cache
      queryClient.removeQueries({ queryKey: ["product", id] });
    },
  });
};

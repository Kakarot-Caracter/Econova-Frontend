import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar usuario");
      }

      return userId;
    },

    onSuccess: (deletedId) => {
      queryClient.setQueryData(["users"], (oldUsers: any) =>
        oldUsers?.filter((u: any) => u.id !== deletedId),
      );
      queryClient.removeQueries({ queryKey: ["user", deletedId] });
    },

    onError: (error: any) => {
      console.error("Error al eliminar usuario:", error.message || error);
      alert(error.message || "No se pudo eliminar el usuario");
    },
  });
};

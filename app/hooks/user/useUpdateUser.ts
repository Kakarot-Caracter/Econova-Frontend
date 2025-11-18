import { User } from "@/app/shared/interfaces/user.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateUserData = Partial<User>;

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserData) => {
      const res = await fetch(`/api/users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

      return (await res.json()) as User;
    },

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser);

      queryClient.setQueryData<User[]>(["users"], (oldUsers) =>
        oldUsers?.map((u) =>
          u.id === updatedUser.id ? { ...u, ...updatedUser } : u,
        ),
      );
    },
  });
};

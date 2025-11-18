import { User } from "@/app/shared/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () =>
  useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`/api/users/all`, {
        credentials: "include",
      });

      return await res.json();
    },
  });

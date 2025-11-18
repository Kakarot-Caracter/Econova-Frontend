import { User } from "@/app/shared/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`/api/users/`, {
        credentials: "include",
      });

      return await res.json();
    },
  });

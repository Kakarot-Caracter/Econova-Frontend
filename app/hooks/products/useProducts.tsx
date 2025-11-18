import { useQuery } from "@tanstack/react-query";

import { Product } from "@/app/shared/interfaces/product.interface";

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`/api/products/all`, {
        credentials: "include",
      });

      return await res.json();
    },
  });

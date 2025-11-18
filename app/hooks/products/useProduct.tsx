import { useQuery } from "@tanstack/react-query";

import { Product } from "@/app/shared/interfaces/product.interface";

export const useProduct = (id: string) =>
  useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`, {
        credentials: "include",
      });

      return await res.json();
    },
  });

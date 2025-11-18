import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/app/shared/interfaces/product.interface";

interface CreateProductData {
  name: string;
  sku: string;
  category: Category;
  price: number;
  stock: number;
  description?: string;
}

interface CreateProductParams {
  data: CreateProductData;
  file?: File;
}

interface ProductResponse {
  id: string;
  name: string;
  sku: string;
  category: Category;
  price: number;
  stock: number;
  image?: string;
  imageId?: string;
  description?: string;
}

const createProduct = async ({
  data,
  file,
}: CreateProductParams): Promise<ProductResponse> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (file) {
    formData.append("file", file);
  }

  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al crear el producto");
  }

  return res.json();
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidar la lista de productos para refrescarla
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Error al crear producto:", error);
    },
  });
};

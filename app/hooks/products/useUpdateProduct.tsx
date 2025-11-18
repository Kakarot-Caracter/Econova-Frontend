import { Category } from "@/app/shared/interfaces/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  sku?: string;
  category?: Category;
}

interface UpdateProductParams {
  id: string;
  data: UpdateProductData;
  file?: File;
}

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  image?: string;
  imageId?: string;
}

const updateProduct = async ({
  id,
  data,
  file,
}: UpdateProductParams): Promise<ProductResponse> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (file) {
    formData.append("file", file);
  }

  const response = await fetch(`/api/products/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al actualizar el producto");
  }

  return response.json();
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      queryClient.invalidateQueries({
        queryKey: ["products", variables.id],
      });
    },
    onError: (error: Error) => {
      console.error("Error al actualizar producto:", error);
    },
  });
};

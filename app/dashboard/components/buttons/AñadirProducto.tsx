"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProduct } from "@/app/hooks/products/useCreateProduct";
import { Category } from "@/app/shared/interfaces/product.interface";

const ProductoSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres"),
  sku: z.string().min(1, "El SKU es obligatorio"),
  category: z.enum(Category),
  price: z
    .string()
    .refine((val) => parseFloat(val) > 0, "El precio debe ser mayor a 0"),
  stock: z
    .string()
    .refine((val) => parseInt(val) >= 0, "El stock no puede ser negativo"),
  imageUrl: z.string().optional(),
});

export default function AñadirProducto() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const form = useForm({
    resolver: zodResolver(ProductoSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: Category.FASHION_ACCESSORIES,
      price: "",
      stock: "0",
      imageUrl: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      form.setError("imageUrl", {
        message: "La imagen no debe superar 2MB",
      });
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      form.setError("imageUrl", {
        message: "Formato no válido. Usa JPG, PNG, GIF o WebP",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setSelectedFile(file);
      form.clearErrors("imageUrl");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    form.setValue("imageUrl", "");
    setImagePreview("");
    setSelectedFile(null);
  };

  const onSubmit = form.handleSubmit((data) => {
    createProduct(
      {
        data: {
          name: data.name,
          sku: data.sku,
          category: data.category,
          price: Number(data.price),
          stock: parseInt(data.stock),
          description: data.description,
        },
        file: selectedFile || undefined,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          setIsOpen(false);
          form.reset();
          setImagePreview("");
          setSelectedFile(null);
        },
        onError: (error: Error) => {
          form.setError("root", {
            message: error.message || "Error al crear el producto",
          });
        },
      },
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={() => setIsOpen(true)}>+ Nuevo Producto</Button>

      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Producto</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            {/* Imagen */}
            <FormField
              name="imageUrl"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm">Imagen</FormLabel>
                  {imagePreview ? (
                    <div className="relative border rounded-md p-2 bg-gray-50">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="object-contain mx-auto"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 h-7 w-7"
                        disabled={isPending}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center border-2 border-dashed p-4 bg-gray-50 rounded-md">
                      <Upload className="w-6 h-6 text-gray-500 mb-1" />
                      <label
                        htmlFor="image-upload"
                        className="text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                      >
                        Subir imagen
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={isPending}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nombre */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nombre del producto"
                      className="h-9"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Descripción</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Descripción del producto"
                      className="h-9"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SKU */}
            <FormField
              name="sku"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">SKU</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Código del producto"
                      className="h-9"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio y Stock */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Precio ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className="h-9"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="stock"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="h-9"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Categoría */}
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Categoría</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Category.FASHION_ACCESSORIES}>
                          Moda y accesorios
                        </SelectItem>
                        <SelectItem value={Category.ELECTRONICS_TECH}>
                          Electrónica y tecnología
                        </SelectItem>
                        <SelectItem value={Category.HOME_GARDEN}>
                          Hogar y jardín
                        </SelectItem>
                        <SelectItem value={Category.HEALTH_BEAUTY}>
                          Salud y belleza
                        </SelectItem>
                        <SelectItem value={Category.SPORTS_OUTDOORS}>
                          Deportes y aire libre
                        </SelectItem>
                        <SelectItem value={Category.FOOD_BEVERAGES}>
                          Alimentos y bebidas
                        </SelectItem>
                        <SelectItem value={Category.BABY_TOYS}>
                          Bebés y juguetes
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending ? "Creando..." : "Crear"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

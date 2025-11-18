"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductEditDialog from "./dialog/ProductEditDialog";
import { useState } from "react";
import ProductDeleteDialog from "./dialog/ProductDeleteDialog";
import Image from "next/image";

export type ProductTableRow = {
  id: string;
  image?: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
};

interface ActionsCellProps {
  product: ProductTableRow;
}

const ActionsCell = ({ product }: ActionsCellProps) => {
  const [isOpenProductDialog, setIsOpenProductDialog] = useState(false);
  const [isOpenDeleteProductDialog, setIsOpenDeleteProductDialog] =
    useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <ProductEditDialog
        product={product}
        isOpenProductDialog={isOpenProductDialog}
        setIsOpenProductDialog={setIsOpenProductDialog}
      />
      <ProductDeleteDialog
        product={product}
        isOpenDeleteDialog={isOpenDeleteProductDialog}
        setIsOpenDeleteDialog={setIsOpenDeleteProductDialog}
      />
    </div>
  );
};

export const columnsProductTable: ColumnDef<ProductTableRow>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
      const src = row.original.image ?? "/images/placeholder-product.png";
      const nombre = row.original.name ?? "Producto";
      return (
        <div className="flex items-center">
          <Image
            src={src}
            alt={nombre}
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-md"
          />
        </div>
      );
    },
  },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "category", header: "Categoría" },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => <span>{row.original.price}$</span>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.original.stock;
      const low = stock <= 5;
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${
            low ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {stock}
        </span>
      );
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <ActionsCell product={row.original} />,
  },
];

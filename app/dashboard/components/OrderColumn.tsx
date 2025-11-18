"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import OrderDeleteDialog from "./dialog/OrderDeleteDialog";

import { OrderStatus } from "@/app/shared/interfaces/order.interface";
import OrderViewDialog from "./dialog/OrderViewDialog";
import OrderDialog from "./dialog/OrderDialog";

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image?: string;
    price: number;
  };
};

export type OrderTableRow = {
  id: string;
  userId: number;
  total: number;
  status: OrderStatus;
  itemsCount: number;
  items?: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
};

interface ActionsCellProps {
  order: OrderTableRow;
}

// Función auxiliar para obtener el color del badge según el estado
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case OrderStatus.PROCESSING:
      return "bg-blue-100 text-blue-700 border-blue-300";
    case OrderStatus.SHIPPED:
      return "bg-purple-100 text-purple-700 border-purple-300";
    case OrderStatus.DELIVERED:
      return "bg-green-100 text-green-700 border-green-300";
    case OrderStatus.CANCELLED:
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

// Función para traducir el estado
const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pendiente";
    case OrderStatus.PROCESSING:
      return "Procesando";
    case OrderStatus.SHIPPED:
      return "Enviado";
    case OrderStatus.DELIVERED:
      return "Entregado";
    case OrderStatus.CANCELLED:
      return "Cancelado";
    default:
      return status;
  }
};

// Componente para las acciones (ver / eliminar)
const ActionsCell = ({ order }: ActionsCellProps) => {
  const [isOpenOrderDialog, setIsOpenOrderDialog] = useState(false);
  const [isOpenDeleteOrderDialog, setIsOpenDeleteOrderDialog] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <OrderViewDialog order={order} />
      <OrderDialog
        order={order}
        isOpenOrderDialog={isOpenOrderDialog}
        setIsOpenOrderDialog={setIsOpenOrderDialog}
      />
      <OrderDeleteDialog
        order={order}
        isOpenDeleteDialog={isOpenDeleteOrderDialog}
        setIsOpenDeleteDialog={setIsOpenDeleteOrderDialog}
      />
    </div>
  );
};

// Columnas para orders
export const columnsOrderTable: ColumnDef<OrderTableRow>[] = [
  {
    accessorKey: "id",
    header: "ID Orden",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-gray-700">
        #{row.original.id.slice(0, 8)}
      </span>
    ),
  },
  {
    accessorKey: "userId",
    header: "ID Cliente",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">{row.original.userId}</span>
    ),
  },
  {
    accessorKey: "itemsCount",
    header: "Items",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">{row.original.itemsCount}</span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">${row.original.total}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            status,
          )}`}
        >
          {getStatusLabel(status)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Creación",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <span className="text-sm text-gray-700">
          {date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Última Actualización",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return (
        <span className="text-sm text-gray-600">
          {date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <ActionsCell order={row.original} />,
  },
];

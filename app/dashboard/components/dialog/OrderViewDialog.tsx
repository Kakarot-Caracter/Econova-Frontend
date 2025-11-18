"use client";
import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/app/shared/interfaces/order.interface";
import { OrderTableRow } from "../OrderColumn";
import { useUser } from "@/app/hooks/user/useUser";
import { useUsers } from "@/app/hooks/user/useUsers";

// Helpers
const getStatusColor = (status: OrderStatus) => {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-700 border-yellow-300",
    [OrderStatus.PROCESSING]: "bg-blue-100 text-blue-700 border-blue-300",
    [OrderStatus.SHIPPED]: "bg-purple-100 text-purple-700 border-purple-300",
    [OrderStatus.DELIVERED]: "bg-green-100 text-green-700 border-green-300",
    [OrderStatus.CANCELLED]: "bg-red-100 text-red-700 border-red-300",
  };
  return colors[status] ?? "bg-gray-100 text-gray-700 border-gray-300";
};

const getStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "Pendiente",
    [OrderStatus.PROCESSING]: "Procesando",
    [OrderStatus.SHIPPED]: "Enviado",
    [OrderStatus.DELIVERED]: "Entregado",
    [OrderStatus.CANCELLED]: "Cancelado",
  };
  return labels[status] ?? status;
};

interface Props {
  order: OrderTableRow;
}

export default function OrderViewDialog({ order }: Props) {
  const { data: user, isLoading } = useUsers();

  const userFiltered = user?.filter((u) => u.id === order.userId)[0];

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Detalles de la Orden
          </DialogTitle>
          <DialogDescription>
            Información completa de la orden #{order.id.slice(0, 8)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* INFORMACIÓN GENERAL */}
          <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-3 text-gray-900">
              Información General
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Info label="ID de Orden" value={`#${order.id}`} mono />
              <Info label="ID de Cliente" value={order.userId} />
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mt-1 ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <Info label="Total" value={`$${order.total}`} big />
              <Info
                label="Fecha de Creación"
                value={new Date(order.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
              <Info
                label="Última Actualización"
                value={new Date(order.updatedAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </div>
          </section>

          {isLoading ? (
            <p className="text-gray-500">Cargando datos del comprador...</p>
          ) : userFiltered ? (
            <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">
                Detalles del Comprador
              </h3>

              <div className="grid grid-cols-1  gap-4">
                <Info label="Nombre" value={userFiltered.name} />
                {userFiltered.email && (
                  <Info label="Correo" value={userFiltered.email} />
                )}
                {userFiltered.phone && (
                  <Info label="Teléfono" value={userFiltered.phone} />
                )}
                {userFiltered.address && (
                  <Info label="Dirección" value={userFiltered.address} />
                )}
              </div>
            </section>
          ) : (
            <p className="text-red-500">
              No se encontró información del comprador
            </p>
          )}

          {/* ITEMS */}
          <section>
            <h3 className="font-semibold text-lg mb-3 text-gray-900">
              Productos ({order.itemsCount})
            </h3>
            <div className="space-y-3">
              {order.items?.length ? (
                order.items.map((item, index) => (
                  <article
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm font-semibold text-gray-500 w-8">
                      {index + 1}.
                    </span>

                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded border border-gray-300"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ID: {item.productId.slice(0, 8)}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span>
                          Cantidad: <strong>{item.quantity}</strong>
                        </span>
                        <span>
                          Precio unitario: <strong>${item.price}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="text-right ml-auto">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${item.quantity * item.price}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No hay items en esta orden
                </p>
              )}
            </div>
          </section>

          {/* TOTAL */}
          <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total de la Orden
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${order.total}
              </span>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({
  label,
  value,
  mono = false,
  big = false,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
  big?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p
        className={
          big
            ? "font-bold text-xl text-gray-900"
            : mono
              ? "font-mono text-sm font-medium"
              : "font-medium text-gray-800"
        }
      >
        {value}
      </p>
    </div>
  );
}

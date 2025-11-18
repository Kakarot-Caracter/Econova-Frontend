"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { OrderTableRow } from "../OrderColumn";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/app/shared/interfaces/order.interface";
import { useUpdateOrder } from "@/app/hooks/orders/useUpdateOrder";

interface OrderDialogProps {
  order: OrderTableRow;
  isOpenOrderDialog: boolean;
  setIsOpenOrderDialog: (isOpen: boolean) => void;
}

const OrderSchema = z.object({
  status: z.enum(OrderStatus, { error: "Status is required" }),
});

type OrderFormData = z.infer<typeof OrderSchema>;

export default function OrderDialog({
  order,
  isOpenOrderDialog,
  setIsOpenOrderDialog,
}: OrderDialogProps) {
  const { mutate: updateOrder, isPending } = useUpdateOrder(order.id);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      status: order.status,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    updateOrder(data, {
      onSuccess: () => {
        setIsOpenOrderDialog(false);
      },
    });
  });

  // Función para obtener el label traducido del estado
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

  return (
    <Dialog open={isOpenOrderDialog} onOpenChange={setIsOpenOrderDialog}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpenOrderDialog(true)}
      >
        <Pencil className="w-4 h-4" />
      </Button>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Orden #{order.id.slice(0, 8)}</DialogTitle>
          <DialogDescription>Actualiza el estado de la orden</DialogDescription>
        </DialogHeader>

        {/* Información de la orden (solo lectura) */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">ID de Orden</p>
            <p className="font-mono text-sm font-medium">#{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ID de Cliente</p>
            <p className="font-medium">{order.userId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold text-lg">{order.total.toFixed(2)}$</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cantidad de Items</p>
            <p className="font-medium">{order.itemsCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Creación</p>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Última Actualización</p>
            <p className="font-medium">
              {new Date(order.updatedAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Formulario para editar estado */}
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado de la Orden</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OrderStatus.PENDING}>
                          🟡 {getStatusLabel(OrderStatus.PENDING)}
                        </SelectItem>
                        <SelectItem value={OrderStatus.PROCESSING}>
                          🔵 {getStatusLabel(OrderStatus.PROCESSING)}
                        </SelectItem>
                        <SelectItem value={OrderStatus.SHIPPED}>
                          🟣 {getStatusLabel(OrderStatus.SHIPPED)}
                        </SelectItem>
                        <SelectItem value={OrderStatus.DELIVERED}>
                          🟢 {getStatusLabel(OrderStatus.DELIVERED)}
                        </SelectItem>
                        <SelectItem value={OrderStatus.CANCELLED}>
                          🔴 {getStatusLabel(OrderStatus.CANCELLED)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.status && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpenOrderDialog(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

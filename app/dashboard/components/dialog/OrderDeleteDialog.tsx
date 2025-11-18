import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { OrderTableRow } from "../OrderColumn";
import { useDeleteOrder } from "@/app/hooks/orders/useDeleteOrder";

interface OrderDeleteDialogProps {
  order: OrderTableRow;
  isOpenDeleteDialog: boolean;
  setIsOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderDeleteDialog({
  order,
  isOpenDeleteDialog,
  setIsOpenDeleteDialog,
}: OrderDeleteDialogProps) {
  const { mutate: deleteOrder, isPending, isError, error } = useDeleteOrder();

  const handleDelete = () => {
    deleteOrder(order.id, {
      onSuccess: () => {
        setIsOpenDeleteDialog(false);
      },
    });
  };

  return (
    <div>
      <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpenDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4 hover:text-red-600" />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar orden?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede revertir. La orden será eliminada
              permanentemente del sistema.
            </DialogDescription>
          </DialogHeader>

          {/* Información de la orden a eliminar */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ID de Orden:</span>
                <span className="font-mono text-sm font-medium">
                  #{order.id.slice(0, 8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cliente:</span>
                <span className="font-medium">{order.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="font-semibold text-lg">
                  {order.total.toFixed(2)}$
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estado:</span>
                <span className="font-medium">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Items:</span>
                <span className="font-medium">{order.itemsCount}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpenDeleteDialog(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Eliminando..." : "Eliminar Orden"}
            </Button>
          </div>

          {isError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {error?.message || "Error desconocido al eliminar la orden"}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

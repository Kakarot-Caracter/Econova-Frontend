import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Order, OrderStatus } from "@/app/shared/interfaces/order.interface";

interface OrderCardProps {
  order: Order;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    [OrderStatus.PENDING]: {
      label: "Pendiente",
      className: "bg-yellow-100 text-yellow-800",
    },
    [OrderStatus.PROCESSING]: {
      label: "En proceso",
      className: "bg-blue-100 text-blue-800",
    },
    [OrderStatus.SHIPPED]: {
      label: "Enviado",
      className: "bg-purple-100 text-purple-800",
    },
    [OrderStatus.DELIVERED]: {
      label: "Entregado",
      className: "bg-green-100 text-green-800",
    },
    [OrderStatus.CANCELLED]: {
      label: "Cancelado",
      className: "bg-red-100 text-red-800",
    },
  };

export function OrderCard({ order }: OrderCardProps) {
  const status = statusConfig[order.status];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pedido</p>
            <p className="font-mono text-xs text-muted-foreground">
              #{order.id.slice(0, 8)}
            </p>
          </div>
          <Badge className={status.className} variant="secondary">
            {status.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground pt-2">
          {" "}
          {new Date(order.createdAt).toLocaleDateString("es-ES")}
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-medium leading-tight">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  {item.price * item.quantity}$
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">Total</span>
            <span className="text-xl font-bold">{order.total}$</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

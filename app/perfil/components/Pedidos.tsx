import { Order } from "@/app/shared/interfaces/order.interface";
import { OrderCard } from "./PedidoCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PedidosProps {
  pedidos: Order[];
}

export default function Pedidos({ pedidos }: PedidosProps) {
  return (
    <Card className="min-h-screen ">
      <CardHeader className="border-b">
        <CardTitle className="text-xl sm:text-2xl">Mis Pedidos</CardTitle>
        <CardDescription>
          Revisa el estado de tus pedidos recientes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pedidos.map((pedido) => (
          <OrderCard key={pedido.id} order={pedido} />
        ))}
      </CardContent>
    </Card>
  );
}

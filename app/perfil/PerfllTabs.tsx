import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "../hooks/user/useUser";

import Perfil from "./components/Perfil";
import Pedidos from "./components/Pedidos";
import Direccion from "./components/Direccion";
import Favoritos from "./components/Favoritos";
import { useProducts } from "../hooks/products/useProducts";
import { useOrder } from "../hooks/orders/useOrder";

export default function PerfilTabs() {
  const { data: user } = useUser();
  const { data: orders } = useOrder();
  const { data: productos } = useProducts();

  console.log(orders);

  if (!user) return null;
  if (!orders) return null;
  if (!productos) return null;

  return (
    <main className="flex justify-center items-center ">
      <Tabs defaultValue="perfil" className="w-full mx-2 ">
        <TabsList className="rounded-md py-4 w-full ">
          <TabsTrigger className="rounded-none  p-3  text-xs" value="perfil">
            Perfil
          </TabsTrigger>
          <TabsTrigger className="rounded-none p-3 text-xs " value="pedidos">
            Pedidos
          </TabsTrigger>
          <TabsTrigger className="rounded-none p-3 text-xs" value="favoritos">
            Favoritos
          </TabsTrigger>
          <TabsTrigger className="rounded-none p-3 text-xs" value="direccion">
            Direccion
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Perfil user={user} />
        </TabsContent>

        <TabsContent value="pedidos">
          <Pedidos pedidos={orders} />
        </TabsContent>
        <TabsContent value="favoritos">
          <Favoritos productos={productos} />
        </TabsContent>
        <TabsContent value="direccion">
          <Direccion direccion={user.address} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

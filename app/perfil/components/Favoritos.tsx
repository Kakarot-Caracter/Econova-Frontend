import { Order } from "@/app/shared/interfaces/order.interface";
import { OrderCard } from "./PedidoCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/app/shared/interfaces/product.interface";
import ProductCard from "@/app/productos/components/productCard";

import { useFavoritesStore } from "@/app/stores/useFavoriteStore";

interface FavoritosProps {
  productos: Product[];
}

export default function Favoritos({ productos }: FavoritosProps) {
  const { favorites } = useFavoritesStore();
  const productsFiltered = productos.filter((product) =>
    favorites.includes(product.id),
  );
  return (
    <Card className="min-h-screen ">
      <CardHeader className="border-b">
        <CardTitle className="text-xl sm:text-2xl">
          Mis Productos Favoritos
        </CardTitle>
        <CardDescription>
          Encuentra tus productos favoritos aquí.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {productsFiltered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CardContent>
    </Card>
  );
}

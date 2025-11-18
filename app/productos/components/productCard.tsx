import { Product } from "@/app/shared/interfaces/product.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProductoCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductoCardProps) {
  return (
    <Card className="max-w-xs flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-lg mx-2 mt-2">
        <Image
          src={product.image || ""}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <CardContent className="flex flex-col p-4 flex-1">
        <h3 className="text-lg font-semibold break-words whitespace-normal">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground break-words whitespace-normal line-clamp-4">
          {product.description}
        </p>

        <div className="mt-auto">
          <span className="text-sm font-medium text-foreground">
            {product.price} $
          </span>

          <Button className="mt-4 w-full" asChild>
            <Link href={`/productos/${product.slug}/${product.id}`}>
              Comprar Producto
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

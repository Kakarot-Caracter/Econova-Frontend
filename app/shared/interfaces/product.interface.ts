import { OrderItem } from "./order.interface";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  imageId: string | null;
  stock: number;
  sku: string;
  category: Category;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Category {
  FASHION_ACCESSORIES = "FASHION_ACCESSORIES", // Moda y accesorios
  ELECTRONICS_TECH = "ELECTRONICS_TECH", // Electrónica y tecnología
  HOME_GARDEN = "HOME_GARDEN", // Hogar y jardín
  HEALTH_BEAUTY = "HEALTH_BEAUTY", // Salud y belleza
  SPORTS_OUTDOORS = "SPORTS_OUTDOORS", // Deportes y aire libre
  FOOD_BEVERAGES = "FOOD_BEVERAGES", // Alimentación y bebidas
  BABY_TOYS = "BABY_TOYS", // Bebés y juguetes
}

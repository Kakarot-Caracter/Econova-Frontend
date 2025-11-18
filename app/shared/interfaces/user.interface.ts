import { Order } from "./order.interface";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: Role;
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

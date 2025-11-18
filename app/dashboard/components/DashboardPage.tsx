"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/datatable";
import { columnsUserTable, UserTableRow } from "./UserColumn";
import { useUsers } from "@/app/hooks/user/useUsers";
import { useProducts } from "@/app/hooks/products/useProducts";
import { columnsProductTable, ProductTableRow } from "./ProductColumn";
import { columnsOrderTable, OrderTableRow } from "./OrderColumn";
import { useOrders } from "@/app/hooks/orders/useOrders";
import AñadirProducto from "./buttons/AñadirProducto";

export default function DashboardPage() {
  const { data: users } = useUsers();
  const { data: products } = useProducts();
  const { data: orders } = useOrders();

  const [selectedTab, setSelectedTab] = useState("dashboard");

  if (!users || !products || !orders) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  const tableUserData: UserTableRow[] = users.map((user) => ({
    id: user.id,
    nombre: user.name,
    email: user.email,
    telefono: user.phone || "-",
    rol: user.role || "-",
    fecha: new Date(user.createdAt).toLocaleDateString(),
  }));

  const tableProductData: ProductTableRow[] = products.map((product) => ({
    id: product.id,
    description: product.description ?? "-",
    image: product.image ?? undefined,
    sku: product.sku,
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
  }));

  const tableOrderData: OrderTableRow[] = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    total: order.total,
    status: order.status,
    itemsCount: order.items?.length || 0,
    items: order.items?.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      product: {
        id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
      },
    })),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }));

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📊</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Panel Principal
                </h1>
                <p className="text-gray-600">
                  Bienvenido al sistema de gestión
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Usuarios</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {users.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Productos</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {products.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Órdenes</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Gestión de usuarios
            </h2>

            <DataTable columns={columnsUserTable} data={tableUserData} />
          </div>
        );
      case "products":
        return (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Gestión de productos
            </h2>
            <DataTable
              columns={columnsProductTable}
              data={tableProductData}
              actions={<AñadirProducto />}
            />
          </div>
        );
      case "orders":
        return (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Gestión de órdenes
            </h2>
            <DataTable columns={columnsOrderTable} data={tableOrderData} />
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">Selecciona una opción del menú</p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar onSelectTab={setSelectedTab} selectedKey={selectedTab} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6 gap-4 bg-gray-50">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

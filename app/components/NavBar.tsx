"use client";

import { ShoppingBag, User, LogOut, Settings, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useUser } from "../hooks/user/useUser";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "../shared/const/queryClient";
import { useState } from "react";
import CarritoDeCompras from "./CarritoDeCompra";
import { useCartStore } from "../stores/useCartStore";
import { set } from "zod/v3";

export default function NavbarClient({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <QueryClientProvider client={client}>
      <NavBar isAuthenticated={isAuthenticated} />
    </QueryClientProvider>
  );
}

function NavBar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { data: user } = useUser();

  const { isOpenCarrito, setIsOpenCarrito } = useCartStore();

  const pathname = usePathname();
  const router = useRouter();
  const hiddenRoutes = ["/registro", "/login", "/dashboard"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      router.push("/login");
    });
  };

  return (
    <>
      <header className="relative bg-white shadow-xs px-4 sm:px-4 lg:px-8 flex items-center justify-between h-15 ">
        <div>
          <Link href="/">
            <span className="font-bold text-md md:text-xl lg:text-2xl">
              Econova
            </span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="flex gap-3 justify-center items-center text-xs md:text-lg lg:text-xl">
            {user?.role === "ADMIN" && (
              <>
                <div className="flex justify-center items-center ">
                  <Wrench onClick={() => router.push("/dashboard")} />
                </div>
                <div>|</div>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:opacity-80 transition">
                  <User />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push("/perfil")}>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div>|</div>

            <div className="flex justify-center items-center ">
              <ShoppingBag onClick={() => setIsOpenCarrito(true)} />
            </div>
          </div>
        )}

        {isOpenCarrito && <CarritoDeCompras />}

        {!isAuthenticated && (
          <div className="text-xs md:text-lg lg:text-xl">
            <Link href="/login">Iniciar Sesión</Link> |{" "}
            <Link href="/registro">Registrarse</Link>
          </div>
        )}
      </header>
    </>
  );
}

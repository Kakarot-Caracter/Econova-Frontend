"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { client } from "../shared/const/queryClient";
import OfertasPage from "./OfertasPage";

export default function Ofertas() {
  return (
    <QueryClientProvider client={client}>
      <OfertasPage />
    </QueryClientProvider>
  );
}

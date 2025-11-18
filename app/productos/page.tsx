"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "../shared/const/queryClient";
import ProductsPage from "./components/ProductsPage";

export default function Page() {
  return (
    <QueryClientProvider client={client}>
      <ProductsPage />
    </QueryClientProvider>
  );
}

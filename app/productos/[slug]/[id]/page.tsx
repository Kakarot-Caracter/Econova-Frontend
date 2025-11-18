"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import ProductDetail from "./components/ProductDetail";
import { client } from "@/app/shared/const/queryClient";

export default function Page() {
  return (
    <QueryClientProvider client={client}>
      <ProductDetail />
    </QueryClientProvider>
  );
}

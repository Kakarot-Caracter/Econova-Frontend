"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "../shared/const/queryClient";
import PerfilTabs from "./PerfllTabs";

export default function Page() {
  return (
    <QueryClientProvider client={client}>
      <PerfilTabs />
    </QueryClientProvider>
  );
}

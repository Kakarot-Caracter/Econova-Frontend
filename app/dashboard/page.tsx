"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "../shared/const/queryClient";
import DashboardPage from "./components/DashboardPage";

export default function Page() {
  return (
    <QueryClientProvider client={client}>
      <DashboardPage />
    </QueryClientProvider>
  );
}

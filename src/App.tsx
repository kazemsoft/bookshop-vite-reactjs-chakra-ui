import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@components/ui/toaster";
import { Suspense } from "react";
import CenterProgress from "@components/Progress/CenterProgress/CenterProgress";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<CenterProgress />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

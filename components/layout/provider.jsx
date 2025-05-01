"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";

const Provider = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader showSpinner={false} color="#FF165D" />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;

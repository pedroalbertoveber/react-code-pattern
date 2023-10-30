import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Router } from "./Router";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import { Toaster } from "sonner";

export function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <Provider>
      <Toaster richColors theme="light" />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <main className="flex flex-col prose prose-sm prose-sky max-w-full w-full items-center justify-center min-h-screen">
          <section className="flex p-4 flex-col items-center justify-center max-w-7xl">
            {children}
          </section>
        </main>
      </QueryClientProvider>
    </Provider>
  );
}

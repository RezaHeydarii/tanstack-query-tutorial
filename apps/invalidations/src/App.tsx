import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, TodoPage } from "./pages";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: () => 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/todo/:id"
            element={
              <Suspense>
                <TodoPage />
              </Suspense>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

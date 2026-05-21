import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import { initializeStorageVersion } from "@/lib/storageVersion";
import { trackPageView } from "@/lib/gtm-events";
import App from "./App";
import "./index.css";

// Initialize storage versioning to clear stale state on deployments
initializeStorageVersion();

// Initialize window.dataLayer for GTM if it doesn't exist
if (typeof window !== "undefined" && !window.dataLayer) {
  window.dataLayer = [];
}

// Track initial page view
if (typeof window !== "undefined") {
  trackPageView(window.location.pathname, document.title);
}

// Add cache-busting headers to prevent stale assets
if (typeof window !== "undefined") {
  // Force browsers to revalidate cached assets on each visit
  const meta = document.createElement("meta");
  meta.httpEquiv = "Cache-Control";
  meta.content = "no-cache, no-store, must-revalidate";
  document.head.appendChild(meta);
}

const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

const root = createRoot(document.getElementById("root")!);
root.render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);

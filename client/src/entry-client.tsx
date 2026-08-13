import { createRoot, hydrateRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Router } from "wouter";
import superjson from "superjson";
import { initializeStorageVersion } from "@/lib/storageVersion";
import type { BlogPostRecord } from "@/contexts/BlogPostsContext";
import App from "./App";
import { trpc } from "@/lib/trpc";
import "./index.css";

declare global {
  interface Window {
    __DTT_BLOG_POSTS__?: BlogPostRecord[] | null;
    __DTT_SSR_PATH__?: string;
  }
}

initializeStorageVersion();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") console.error("[API Query Error]", event.query.state.error);
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") console.error("[API Mutation Error]", event.mutation.state.error);
});

const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: "/api/trpc", transformer: superjson, fetch: (input, init) => globalThis.fetch(input, { ...(init ?? {}), credentials: "include" }) })],
});

const app = (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <Router><App initialBlogPosts={window.__DTT_BLOG_POSTS__ ?? null} /></Router>
    </QueryClientProvider>
  </trpc.Provider>
);

const root = document.getElementById("root")!;
if (root.firstChild) hydrateRoot(root, app);
else createRoot(root).render(app);

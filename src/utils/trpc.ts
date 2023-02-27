import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (import.meta.env.SITE_URL) return `https://${import.meta.env.SITE_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

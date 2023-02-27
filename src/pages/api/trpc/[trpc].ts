import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/_app";
import type { APIRoute } from "astro";

export const all: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: `/api/trpc`,
    req: request,
    router: appRouter,
    createContext: () => ({}),
  });
};

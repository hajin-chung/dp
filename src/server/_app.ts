import { exampleRouter } from "./router/example";
import { router } from "./trpc";

export const appRouter = router({
  example: exampleRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
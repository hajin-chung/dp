import { initTRPC, TRPCError } from "@trpc/server";

type Context = {
  isAdmin: boolean;
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

const isAdmin = middleware(async ({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});

export const adminProcedure = publicProcedure.use(isAdmin);

import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
  hi: publicProcedure.input(z.object({name: z.string()})).query(({input, ctx}) => {
    console.log(ctx);
    return `hi ${input.name}`;
  })
})
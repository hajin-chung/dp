import { adminProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import {
  createPost,
  updatePost,
  getPost,
  getPosts,
  deletePost,
} from "@/utils/db";
import { PostSchema } from "@/utils/types";

export const postRouter = router({
  getById: publicProcedure.input(z.string()).query(({ input }) => {
    return getPost(input);
  }),
  getList: publicProcedure
    .input(z.object({ cursor: z.optional(z.string()) }))
    .query(({ input }) => {
      const { cursor } = input;
      return getPosts(cursor);
    }),
  create: adminProcedure
    .input(PostSchema.pick({ title: true, content: true }))
    .mutation(({ input }) => {
      return createPost(input);
    }),
  update: adminProcedure.input(PostSchema).mutation(({ input }) => {
    return updatePost(input);
  }),
  deleteById: adminProcedure.input(z.string()).query(({ input }) => {
    return deletePost(input);
  }),
});

import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  created: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostInfo = Pick<Post, "id" | "title" | "created">;
export type PostContent = Pick<Post, "title" | "content">;

export type Theme = "dark" | "light";

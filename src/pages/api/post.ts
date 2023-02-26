import { createPost, getPost, getPosts, updatePost } from "@/utils/db";
import type { Post, PostContent } from "@/utils/types";
import type { APIRoute } from "astro";

export const get: APIRoute = async ({request}) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    const posts = await getPosts();
    return new Response(JSON.stringify({posts}));
  } else {
    const post = await getPost(id);
    return new Response(JSON.stringify({post}));
  }
}

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const newPost = body as PostContent;
  const res = await createPost(newPost);

  return new Response(JSON.stringify(res));
};

export const patch: APIRoute = async ({ request }) => {
  const body = await request.json();
  const updatedPost = body as Post;
  const res = await updatePost(updatedPost);

  return new Response(JSON.stringify(res));
};

import type { Post, PostContent, PostInfo } from "../utils/types";
import { createClient } from "@supabase/supabase-js";
import { createId } from "@paralleldrive/cuid2";

const DB_URI = import.meta.env.DB_URI;
const DB_KEY = import.meta.env.DB_KEY;

export const client = createClient(DB_URI, DB_KEY);

export const getPosts = async (cursor?: string) => {
  try {
    const { data, error } = await client
      .from("posts")
      .select("id, title, created")
      .order("created", { ascending: false });
    if (error) throw error;
    return (data ?? []) as PostInfo[];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getPost = async (id: string) => {
  try {
    const { data, error } = await client
      .from("posts")
      .select("id, title, created, content")
      .eq("id", id);
    if (error) throw error;
    if (data === null) throw "post not found";
    if (!data[0]) throw "post id not found";
    return data[0] as Post;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const createPost = async (newPost: PostContent) => {
  try {
    const id = createId();
    const created = new Date().toISOString();
    const post = { id, created, ...newPost };
    const { error } = await client.from("posts").insert(post);

    if (error) throw error;
    return { error: false, post };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
};

export const updatePost = async (updatedPost: Post) => {
  try {
    const { error } = await client
      .from("posts")
      .update(updatedPost)
      .eq("id", updatedPost.id);
    if (error) throw error;
    return { error: false, post: updatedPost };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
};

export const deletePost = async (id: string) => {
  try {
    const { error } = await client.from("posts").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

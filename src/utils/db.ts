import type { Post, PostInfo } from "./types";
import { createClient } from "@supabase/supabase-js";

const DB_URI = import.meta.env.DB_URI;
const DB_KEY = import.meta.env.DB_KEY;

const client = createClient(DB_URI, DB_KEY);

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

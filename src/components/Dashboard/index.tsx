import type { Post, PostInfo } from "@/utils/types";
import { createEffect, createSignal, onMount } from "solid-js";
import { Editor } from "../Editor";
import { PostList } from "./PostList";

export const Dashboard = () => {
  const [posts, setPosts] = createSignal<PostInfo[]>([]);
  const [selected, setSelected] = createSignal<string | undefined>();
  const [post, setPost] = createSignal<Post | undefined>();

  onMount(async () => {
    const res = await fetch("/api/post");
    const { posts } = (await res.json()) as { posts: PostInfo[] };
    setPosts(posts);
  });

  createEffect(async () => {
    if (!selected()) return;

    const res = await fetch(`/api/post?id=${selected()}`);
    const { post } = (await res.json()) as { post: Post };
    setPost(post);
  });

  createEffect(async () => {
    console.log(post());
  });

  return (
    <div class="mt-4 flex flex-1 flex-col gap-2">
      <p class="mb-4 text-2xl font-bold">Dashboard</p>
      <div class="flex h-full w-full gap-2 pb-10">
        <PostList posts={posts()} onSelect={(id) => setSelected(id)} />
        <div class="w-4" />
        <Editor post={post()} />
      </div>
    </div>
  );
};

import type { Post, PostInfo } from "@/utils/types";
import { createEffect, createSignal, onMount } from "solid-js";
import { Editor } from "../Editor";
import { PostList } from "./PostList";

export const Dashboard = () => {
  const [posts, setPosts] = createSignal<PostInfo[]>([]);
  const [selected, setSelected] = createSignal<string | undefined>(undefined);
  const [post, setPost] = createSignal<Post | undefined>(undefined);

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
    console.log(post);
  });

  return (
    <div class="flex flex-col gap-2">
      <p class="font-bold text-2xl mb-4">Dashboard</p>
      <div class="flex w-full gap-2">
        <PostList posts={posts} onSelect={(id) => setSelected(id)} />
        <Editor post={post()} />
      </div>
    </div>
  );
};

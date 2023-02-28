import { trpc } from "@/utils/trpc";
import type { PostInfo } from "@/utils/types";
import { Component, createSignal, onMount, Show } from "solid-js";
import { Button } from "../atom/Button";
import { Spinner } from "../atom/Spinner";

type PostListProps = {
  onSelect: (id: string | undefined) => void;
};

export const PostList: Component<PostListProps> = (props) => {
  const [posts, setPosts] = createSignal<PostInfo[]>([]);
  const [loading, setLoading] = createSignal(false);

  const setList = async () => {
    setLoading(true);
    const posts = await trpc.post.getList.query({});
    setPosts(posts);
    setLoading(false);
  };

  onMount(setList);

  return (
    <div class="relative flex w-56 flex-col items-start gap-2 rounded-xl bg-slate-200 p-2 dark:bg-slate-700">
      <Show when={loading()}>
        <div class="absolute top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-lg transition-all">
          <Spinner />
        </div>
      </Show>
      {posts().map(({ title, id }) => (
        <button
          class="w-full break-words rounded-lg p-2 text-left font-bold hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10"
          onClick={() => props.onSelect(id)}
        >
          {title}
        </button>
      ))}
      <Button onClick={() => props.onSelect(undefined)} class="self-end">
        New
      </Button>
      <Button onClick={setList} class="self-end">
        Refresh
      </Button>
    </div>
  );
};

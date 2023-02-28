import { renderToString } from "@/utils/render";
import { trpc } from "@/utils/trpc";
import type { Post } from "@/utils/types";
import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import { Spinner } from "./atom/Spinner";

type EditorProps = {
  id: string | undefined;
};

export const Editor: Component<EditorProps> = (props) => {
  const [post, setPost] = createSignal<Post | undefined>();
  const [content, setContent] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const parsed = () => renderToString(content());

  createEffect(async () => {
    if (!props.id) {
      setPost(undefined);
    } else {
      setLoading(true);
      const post = await trpc.post.getById.query(props.id);
      setPost(post);
      setLoading(false);
    }
  });

  createEffect(() => {
    setContent(post()?.content ?? "");
    setTitle(post()?.title ?? "");
  });

  const handleSubmit = async () => {
    setLoading(true);
    const existingPost = post();
    if (existingPost) {
      await trpc.post.update.mutate({
        ...existingPost,
        title: title(),
        content: content(),
      });
    } else {
      await trpc.post.create.mutate({
        title: title(),
        content: content(),
      });
    }
    setLoading(false);
  };

  return (
    <div class="relative flex h-full w-full flex-col gap-4">
      <Show when={loading()}>
        <div class="absolute top-0 left-0 flex h-full w-full items-center justify-center backdrop-blur-lg transition-all">
          <Spinner />
        </div>
      </Show>
      <input
        value={title()}
        class="border-b-2 border-gray-500 bg-transparent pb-1 text-2xl font-bold outline-none focus:border-black dark:focus:border-white"
        onInput={(e) => setTitle(e.currentTarget.value)}
      />
      <div class="flex w-full flex-1 gap-4">
        <textarea
          class="h-full w-1/2 border-none bg-white text-black outline-none dark:bg-slate-900 dark:text-white"
          value={content()}
          onInput={(e) => setContent(e.currentTarget.value)}
        />
        <div class="h-full w-[2px] bg-gray-500" />
        <article
          innerHTML={parsed()}
          class="prose prose-stone h-full w-1/2 dark:prose-invert"
        />
      </div>
      <button
        class="self-end rounded-lg border-2 border-gray-500 p-2 text-xl font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

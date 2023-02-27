import { trpc } from "@/utils/trpc";
import type { Post } from "@/utils/types";
import { marked } from "marked";
import { Component, createEffect, createSignal } from "solid-js";

type EditorProps = {
  post: Post | undefined;
};

export const Editor: Component<EditorProps> = (props) => {
  const [content, setContent] = createSignal(props.post?.content ?? "");
  const [title, setTitle] = createSignal(props.post?.title ?? "");
  const parsed = () => marked.parse(content());

  createEffect(() => {
    setContent(props.post?.content ?? "");
    setTitle(props.post?.title ?? "");
  });

  const handleSubmit = async () => {
    if (props.post) {
      await trpc.post.update.mutate({
        ...props.post,
        title: title(),
        content: content(),
      });
    } else {
      await trpc.post.create.mutate({
        title: title(),
        content: content(),
      });
    }
  };

  return (
    <div class="flex h-full w-full flex-col gap-4">
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

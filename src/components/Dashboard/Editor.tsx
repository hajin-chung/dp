import { formatDate } from "@/utils/formatDate";
import { renderToString } from "@/utils/render";
import { trpc } from "@/utils/trpc";
import type { Post } from "@/utils/types";
import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import { Button } from "../atom/Button";
import { Spinner } from "../atom/Spinner";

type EditorProps = {
  id: string | undefined;
};

export const Editor: Component<EditorProps> = (props) => {
  const [post, setPost] = createSignal<Post | undefined>();
  const [content, setContent] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [created, setCreated] = createSignal(formatDate(new Date().toString()));
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
    setCreated(formatDate(post()?.created ?? new Date().toString()));
  });

  const handleSubmit = async () => {
    setLoading(true);
    const existingPost = post();
    if (existingPost) {
      await trpc.post.update.mutate({
        ...existingPost,
        title: title(),
        content: content(),
        created: created(),
      });
    } else {
      await trpc.post.create.mutate({
        title: title(),
        content: content(),
        created: created(),
      });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!props.id) return;
    setLoading(true);
    await trpc.post.deleteById.mutate(props.id);
    setPost(undefined);
    setLoading(false);
  };

  return (
    <div class="relative flex h-full w-full flex-col gap-4">
      <input
        type="date"
        value={created()}
        class="self-end bg-transparent"
        onInput={(e) => setCreated(e.currentTarget.value)}
      />
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
      <div class="flex items-center gap-4 self-end">
        <Show when={loading()}>
          <Spinner />
        </Show>
        {props.id && (
          <Button onClick={handleDelete} class="self-end">
            Delete
          </Button>
        )}
        <Button onClick={handleSubmit} class="self-end" />
      </div>
    </div>
  );
};

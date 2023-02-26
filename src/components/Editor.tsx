import type { Post } from "@/utils/types";
import { marked } from "marked";
import { Component, createSignal } from "solid-js";

type EditorProps = {
  post?: Post;
};

export const Editor: Component<EditorProps> = (props) => {
  const post = props.post;
  console.log(props.post);
  const [content, setContent] = createSignal(post?.content ?? "");
  const [title, setTitle] = createSignal(post?.title ?? "");
  const parsed = () => marked.parse(content());

  const handleSubmit = async () => {
    if (post) {
      // edit
      const res = await fetch("/api/post", {
        method: "PATCH",
        body: JSON.stringify({
          ...post,
          content: content(),
          title: title(),
        }),
      });
    } else {
      // create
      const res = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ content: content(), title: title() }),
      });
    }
  };

  return (
    <div class="flex flex-col gap-4 w-full">
      <input
        value={title()}
        class="outline-none border-b-2 bg-transparent border-gray-500 focus:border-black dark:focus:border-white font-bold text-2xl pb-1"
        onInput={(e) => setTitle(e.currentTarget.value)}
      />
      <div class="flex gap-4 w-full">
        <textarea
          class="bg-white dark:bg-slate-900 text-black dark:text-white w-1/2 h-full border-none outline-none"
          value={content()}
          onInput={(e) => setContent(e.currentTarget.value)}
        />
        <div class="h-full w-[2px] bg-gray-500" />
        <article
          innerHTML={parsed()}
          class="w-1/2 h-full prose prose-stone dark:prose-invert"
        />
      </div>
      <button
        class="font-bold text-xl border-2 border-gray-500 rounded-lg self-end p-2 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

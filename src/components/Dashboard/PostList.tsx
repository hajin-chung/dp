import type { PostInfo } from "@/utils/types";
import type { Component } from "solid-js";

type PostListProps = {
  posts: PostInfo[];
  onSelect: (id: string) => void;
};

export const PostList: Component<PostListProps> = (props) => {
  return (
    <div class="flex w-56 flex-col items-start gap-2 rounded-xl bg-slate-200 p-2 dark:bg-slate-700">
      {props.posts.map(({ title, id }) => (
        <button
          class="w-full break-words rounded-lg p-2 text-left font-bold hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10"
          onClick={() => props.onSelect(id)}
        >
          {title}
        </button>
      ))}
      <button class="w-full p-2 font-bold hover:text-sky-500">+ create</button>
    </div>
  );
};

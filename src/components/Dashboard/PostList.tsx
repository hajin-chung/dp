import type { PostInfo } from "@/utils/types";
import type { Accessor, Component } from "solid-js";

type PostListProps = {
  posts: Accessor<PostInfo[]>;
  onSelect: (id: string) => void;
};

export const PostList: Component<PostListProps> = ({ posts, onSelect }) => {
  return (
    <div class="flex gap-2 flex-col w-56 items-start rounded-xl bg-slate-200 dark:bg-slate-700 p-2">
      {posts().map(({ title, id }) => (
        <button
          class="hover:bg-opacity-5 hover:bg-black dark:hover:bg-opacity-10 dark:hover:bg-white rounded-lg p-2 font-bold break-words w-full text-left"
          onClick={() => onSelect(id)}
        >
          {title}
        </button>
      ))}
      <button class="p-2 font-bold w-full hover:text-sky-500">
        + create
      </button>
    </div>
  );
};

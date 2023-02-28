import { createSignal } from "solid-js";
import { Editor } from "./Editor";
import { PostList } from "./PostList";

export const Dashboard = () => {
  const [selected, setSelected] = createSignal<string | undefined>();

  return (
    <div class="mt-4 flex flex-1 flex-col gap-2">
      <p class="mb-4 text-2xl font-bold">Dashboard</p>
      <div class="flex h-full w-full gap-2 pb-10">
        <PostList onSelect={(id) => setSelected(id)} />
        <div class="w-4" />
        <Editor id={selected()} />
      </div>
    </div>
  );
};

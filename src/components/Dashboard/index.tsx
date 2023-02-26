import { PostList } from "./PostList";

export const Dashboard = () => {
  return (
    <div class="flex flex-col gap-2">
      <p class="font-bold text-2xl">Dashboard</p>
      <div class="h-[2px] bg-gray-500" />
      <div class="flex w-full gap-2">
        <PostList />
      </div>
    </div>
  );
};

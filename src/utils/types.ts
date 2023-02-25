export type Post = {
  id: string;
  title: string;
  created: string;
  content: string;
};

export type PostInfo = Pick<Post, "id" | "title" | "created">;
export type PostContent = Pick<Post, "title" | "content">;

export type Theme = "dark" | "light";

export type PostInfo = {
  id: string;
  title: string;
  created: string;
}

export type Post = PostInfo & {
  content: string;
};

export type Theme = "dark" | "light";
import type { AstroCookies } from "astro";

export const getAuthData = (cookies: AstroCookies) => {
  if (!cookies.has("session")) return { isAuthed: false };
  const session = cookies.get("session");
  if (!session.value || session.value !== import.meta.env.SECRET)
    return { isAuthed: false };
  return { isAuthed: true };
};

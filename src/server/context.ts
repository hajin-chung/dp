import { parseCookies } from "@/utils/parseCookies";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = (opts: FetchCreateContextFnOptions) => {
  const cookies = parseCookies(opts.req.headers.get("cookie") ?? "");
  const secret = cookies.session;
  if (secret === import.meta.env.SECRET) {
    return { ...opts, isAdmin: true };
  } else {
    return { ...opts, isAdmin: false };
  }
};

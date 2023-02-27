import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { parse } from "set-cookie-parser";

export const createContext = (opts: FetchCreateContextFnOptions) => {
  const cookies = parse(opts.req.headers.get("cookie") ?? "", {
    decodeValues: true,
    map: true,
  });
  const secret = cookies.session.value;
  if (secret === import.meta.env.SECRET) {
    return { ...opts, isAdmin: true };
  } else {
    return { ...opts, isAdmin: false };
  }
};

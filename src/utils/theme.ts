import { atom } from "nanostores";
import type { Theme } from "./types";

export const theme = atom<Theme>(
  typeof window !== "undefined"
    ? (localStorage.getItem("theme") as Theme) ?? "dark"
    : "dark"
);

theme.listen((nt) => {
  typeof window !== "undefined" && localStorage.setItem("theme", nt);
});

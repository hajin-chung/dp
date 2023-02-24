import { atom } from "nanostores";
import type { Theme } from "./types";

export const theme = atom<Theme>(
  (localStorage.getItem("theme") as Theme) ?? "dark"
);

theme.listen((nt) => {
  localStorage.setItem("theme", nt);
});

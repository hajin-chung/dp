import { atom } from "nanostores";
import type { Theme } from "./types";

export const theme = atom<Theme>(
  typeof window !== "undefined"
    ? (localStorage.getItem("theme") as Theme) ?? "dark"
    : "dark"
);
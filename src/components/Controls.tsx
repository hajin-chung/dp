import Sun from "@/static/sun.svg";
import Moon from "@/static/Moon.svg";
import { useStore } from "@nanostores/solid";
import { theme } from "@/utils/theme";
import { Component, createEffect } from "solid-js";

export const Controls = () => {
  const $theme = useStore(theme);

  createEffect(() => {
    const html = document.getElementById("html");
    if (!html) return;

    html.className = $theme();
    localStorage.setItem("theme", $theme());
  });

  return (
    <div class="fixed bottom-2 right-2 flex flex-col gap-2">
      <button
        class="relative h-9 w-9 rounded-lg bg-slate-900 bg-opacity-10 p-1 dark:bg-white dark:bg-opacity-10"
        onClick={() => window.location.replace("/dashboard")}
      >
        D
      </button>
      <button
        class="relative h-9 w-9 rounded-lg bg-slate-900 bg-opacity-10 p-1 dark:bg-white dark:bg-opacity-10"
        onClick={() => {
          if ($theme() === "dark") theme.set("light");
          else theme.set("dark");
        }}
      >
        {$theme() === "dark" ? (
          <img class="h-full w-full" src={Sun} />
        ) : (
          <img class="h-full w-full" src={Moon} />
        )}
      </button>
    </div>
  );
};

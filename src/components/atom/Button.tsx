import type { ParentComponent } from "solid-js";

type ButtonProps = {
  onClick?: (event: MouseEvent) => void;
  class?: string;
};

export const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      type="submit"
      class={`${props.class} rounded-lg border-2 border-gray-500 px-2 py-1 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black`}
      onClick={props.onClick}
    >
      {props.children || "Submit"}
    </button>
  );
};

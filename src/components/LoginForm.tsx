import { createSignal } from "solid-js";

export const LoginForm = () => {
  const [secret, setSecret] = createSignal("");
  const [message, setMessage] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ secret: secret() }),
    });
    const { success } = await res.json();
    if (success) window.location.replace("/dashboard");
    else setMessage("wrong secret");
  };

  return (
    <div class="mt-10 flex w-full justify-center">
      <form onSubmit={handleSubmit} class="flex flex-col gap-2">
        <input
          type="password"
          class="rounded-lg border-2 border-gray-400 bg-transparent p-1 outline-none hover:border-gray-700 focus:border-gray-900 dark:hover:border-gray-200 dark:focus:border-white"
          value={secret()}
          onInput={(e) => setSecret(e.currentTarget.value)}
        />
        <input
          type="submit"
          class="self-end rounded-lg border-2 border-gray-500 px-2 py-1 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Submit
        </input>
        <p class="text-red-500">{message}</p>
      </form>
    </div>
  );
};

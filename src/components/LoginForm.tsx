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
    <div class="w-full flex justify-center mt-10">
      <form onSubmit={handleSubmit} class="flex flex-col gap-2">
        <input
          type="password"
          class="p-1 border-2 border-gray-400 hover:border-gray-700 focus:border-gray-900 dark:hover:border-gray-200 dark:focus:border-white outline-none bg-transparent rounded-lg"
          value={secret()}
          onInput={(e) => setSecret(e.currentTarget.value)}
        />
        <input
          type="submit"
          class="font-bold border-2 border-gray-500 rounded-lg self-end px-2 py-1 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Submit
        </input>
        <p class="text-red-500">{message}</p>
      </form>
    </div>
  );
};

import { trpc } from "@/utils/trpc";
import { createSignal } from "solid-js";
import { Spinner } from "./atom/Spinner";

export const TestSolid = () => {
  const [message, setMessage] = createSignal("");
  const [name, setName] = createSignal("");

  const handleSubmit = async () => {
    const message = await trpc.example.hi.query({ name: name() });
    setMessage(message);
  };

  return (
    <div>
      <input
        type="text"
        value={name()}
        class="bg-transparent"
        onInput={(e) => setName(e.currentTarget.value)}
      />
      <input type="submit" onClick={handleSubmit} />
      <p class="text-2xl font-bold">{message()}</p>
      <Spinner />
    </div>
  );
};

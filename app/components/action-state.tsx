import { useActionState } from "react";

function increment(prevState: number) {
  return prevState + 1;
}

console.log('useActionState', useActionState)

export default function ActionStateForm() {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form className="flex items-center justify-center flex-col">
      <div>{state}</div>
      <button formAction={formAction}>Increment</button>
    </form>
  );
}

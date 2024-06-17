import { useFormStatus } from "react-dom";

async function asyncAction() {
  return new Promise((resolve) => setTimeout(resolve, 1500, "Hello Form Status"));
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}

export default function FormStatus() {
  return (
    <form action={asyncAction} className="flex items-center justify-center">
      <Submit />
    </form>
  );
}

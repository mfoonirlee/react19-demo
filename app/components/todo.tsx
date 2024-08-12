import { useSyncExternalStore, useState, useEffect } from "react";
import { todoStore } from "../store/todoStore";

export default function Todo() {
  const todos = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapshot
  );
  const [text, setText] = useState("");

  useEffect(() => {
    // after add todo, clear the text
    todoStore.subscribe(() => {
      setText("");
    })
  }, [])

  return (
    <div className="inset-0 flex-col flex items-center justify-center">
      <div>
      <input name="todo-text" type="text" placeholder="input todo text" value={text} onChange={(v) => setText(v.target.value)} />
      <button onClick={() => todoStore.addTodo(text)}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{`TODO #${todo.id}:  `}{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

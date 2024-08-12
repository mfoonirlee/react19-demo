// simple single instance class
type listenerFunc = (todos: Todo[]) => void
interface Todo {
  id: number
  text: string
}


let nextId = 0;
let todos: Todo[] = [{ id: nextId, text: "hello world" }];
let listeners: listenerFunc[] = [];

function emitChange() {
  for(let listener of listeners) {
    listener(todos);
  }
}

export const todoStore = {
  addTodo(todoText: string) {
    todos = [...todos, { id: ++nextId, text: todoText ?? `Todo #${nextId}` }];
    emitChange()
  },
  subscribe(listener: listenerFunc) {
    listeners = [...listeners, listener];
    // return unsubscribe callback
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

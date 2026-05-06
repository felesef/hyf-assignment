import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [draft, setDraft] = useState("");

  function addTodo() {
    const title = draft.trim();
    if (!title) return;
    setTodos((prev) => [...prev, { id: nextId, title }]);
    setNextId((id) => id + 1);
    setDraft("");
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="New todo"
          aria-label="New todo"
        />
        <button type="button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button type="button" onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

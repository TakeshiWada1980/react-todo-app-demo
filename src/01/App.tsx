import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem";
import NewTodoForm from "./NewTodoForm";
import { initTodos } from "./initTodos";

function App() {
  const localStorageKey = "myTodoApp";
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData && storedData !== "[]") {
      const data: Todo[] = JSON.parse(storedData);
      // Todo の deadline が 文字列 になっているので Date に復元
      const todos: Todo[] = data.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : undefined,
      }));
      setTodos(todos);
    } else {
      setTodos(initTodos);
    }
  }, []);

  const updateTodo = (todo: Todo) => {
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(updateTodos);
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const saveTodos = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  };

  const deleteDoneTodos = () => {
    const updateTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updateTodos);
  };

  return (
    <main className="mx-auto mt-14 w-full max-w-2xl px-5 md:px-0">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold">TodoApp Demo</h1>
        <div className="text-sm text-gray-500 ml-2">
          合格水準ギリギリのサンプル（60点）
        </div>
      </div>
      <div className="space-y-4">
        <div>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
          ))}
        </div>

        <div className="space-x-2">
          <button
            onClick={deleteDoneTodos}
            className="bg-red-500 text-sm font-bold rounded-md text-white px-2 py-1 hover:bg-red-700"
          >
            完了済みのTodoを削除
          </button>
          <button
            type="button"
            onClick={saveTodos}
            className="bg-blue-500 text-sm font-bold rounded-md text-white px-2 py-1 hover:bg-blue-700"
          >
            保存
          </button>
        </div>

        <NewTodoForm addTodo={addTodo} />
      </div>
    </main>
  );
}

export default App;

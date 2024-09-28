import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import { TodoItem } from "./TodoItem";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";

const initTodos: Todo[] = [
  { id: uuid(), title: "Reactの勉強", isDone: false },
  { id: uuid(), title: "TypeScriptの勉強", isDone: true },
  { id: uuid(), title: "基礎物理学3の宿題", isDone: false },
  { id: uuid(), title: "解析2の宿題", isDone: false },
];

function App() {
  const localStorageKey = "myTodoApp";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData && storedData !== "[]") {
      setTodos(JSON.parse(storedData));
    } else {
      setTodos(initTodos);
    }
  }, []);

  const updateTodo = (todo: Todo) => {
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(updateTodos);
  };

  const saveData = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  };

  const updateNewTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuid(),
      title: newTodoTitle,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  };

  const deleteDoneTodos = () => {
    const updateTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updateTodos);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">MyTodoApp (Demo-02)</h1>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
        ))}
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <form>
          <label htmlFor="newTodoTitle">New Todo:</label>
          <input
            id="newTodoTitle"
            type="text"
            value={newTodoTitle}
            onChange={updateNewTodoTitle}
            className="border border-gray-400 rounded-md px-2"
          />
          <button
            type="submit"
            onClick={addTodo}
            className="bg-blue-700 text-sm font-bold rounded-md text-white px-2 py-1"
          >
            追加
          </button>
        </form>
      </div>
      <button
        onClick={deleteDoneTodos}
        className="bg-red-700 text-sm font-bold rounded-md text-white px-2 py-1"
      >
        完了したTodoを削除
      </button>
      <button type="button" onClick={saveData}>
        保存
      </button>
      <Button>ボタンで</Button>
    </div>
  );
}

export default App;

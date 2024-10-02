import { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem";
import EditTodoDialog from "./EditTodoDialog";
import { initTodos, initTodoValue } from "./initTodos";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowDownWideShort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const localStorageKey = "myTodoApp";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoEditInitValue, setTodoEditInitValue] =
    useState<Todo>(initTodoValue);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const saveTodos = (todos: Todo[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  };
  const updateTodo = (todo: Todo) => {
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const addTodo = (todo: Todo) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteDoneTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const openDialogNewTodoMode = () => {
    setTodoEditInitValue(initTodoValue);
    setIsDialogOpen(true);
  };

  const openDialogEditTodoMode = (todo: Todo) => {
    setTodoEditInitValue(todo);
    setIsDialogOpen(true);
  };

  const sortTodosByDeadline = () => {
    const updateTodos = [...todos].sort((a, b) => {
      if (a.deadline && b.deadline) {
        return a.deadline.getTime() - b.deadline.getTime();
      }
      if (a.deadline) {
        return -1;
      }
      if (b.deadline) {
        return 1;
      }
      return 0;
    });
    setTodos(updateTodos);
  };

  const sortTodosByPriority = () => {
    const updateTodos = [...todos].sort((a, b) => a.priority - b.priority);
    setTodos(updateTodos);
  };

  return (
    <main className="mx-auto mt-14 w-full max-w-xl px-5 md:px-0">
      <div className="mb-6 space-y-2 flex justify-between ">
        <div>
          <h1 className="text-2xl font-bold">TodoApp Demo</h1>
          <div className="text-sm text-gray-500 ml-2">
            最高水準のサンプル（90点）
          </div>
        </div>
        <div>
          <Button onClick={openDialogNewTodoMode} className="h-auto py-1.5">
            <FontAwesomeIcon icon={faArrowRightToBracket} className="mr-2" />
            <div>Todoの追加</div>
          </Button>
        </div>
      </div>

      <div className="mb-6 flex justify-items-center space-x-2">
        <Button
          onClick={sortTodosByDeadline}
          variant="secondary"
          className="h-auto py-1.5"
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} className="mr-2" />
          <div>期日でソート</div>
        </Button>
        <Button
          onClick={sortTodosByPriority}
          variant="secondary"
          className="h-auto py-1.5"
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} className="mr-2" />
          <div>優先度でソート</div>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={openDialogEditTodoMode}
              updateTodo={updateTodo}
            />
          ))}
        </div>

        <div className="space-x-2">
          <Button onClick={deleteDoneTodos} className="h-auto py-1.5">
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            <div>完了済みのTodoを削除</div>
          </Button>
        </div>

        <EditTodoDialog
          addTodo={addTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          initValue={todoEditInitValue}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />
      </div>
    </main>
  );
}

export default App;

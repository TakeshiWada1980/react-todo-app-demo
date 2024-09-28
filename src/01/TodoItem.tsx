import { Todo } from "./types";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
};

function TodoItem(props: Props) {
  const { todo, updateTodo } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = { ...todo, isDone: e.target.checked };
    updateTodo(newTodo);
  };

  return (
    <div className="flex flex-row space-x-2 items-center">
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.isDone}
        onChange={handleChange}
      />
      <label
        htmlFor={todo.id}
        className={twMerge("", todo.isDone && "line-through")}
      >
        {todo.title}
      </label>
    </div>
  );
}

export { TodoItem };

import { Todo } from "./types";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

type Props = {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
};

const TodoItem = (props: Props) => {
  const { todo, updateTodo } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = { ...todo, isDone: e.target.checked };
    updateTodo(newTodo);
  };

  return (
    <div className="flex flex-row space-x-2 items-baseline">
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
        {todo.name}
      </label>
      <span className="text-sm text-gray-500">（優先度: {todo.priority}）</span>
      {todo.deadline && (
        <span className="text-sm text-gray-500">
          {dayjs(todo.deadline).format("YYYY/MM/DD HH:mm")}
        </span>
      )}
    </div>
  );
};

export default TodoItem;

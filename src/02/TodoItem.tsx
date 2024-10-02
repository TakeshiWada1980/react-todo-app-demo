import { Todo } from "./types";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faSkull } from "@fortawesome/free-solid-svg-icons";
import Star from "./Star";

type Props = {
  todo: Todo;
  editTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
};

const TodoItem = (props: Props) => {
  const { todo, editTodo, updateTodo } = props;
  const isTimeUp = !todo.isDone && todo.deadline && todo.deadline < new Date();

  const handleEdit = () => {
    editTodo(todo);
  };

  const handleIsDoneChange = (checked: boolean) => {
    const newTodo = { ...todo, isDone: checked };
    updateTodo(newTodo);
  };

  let deadlineText: string | undefined = undefined;
  if (todo.deadline) {
    deadlineText =
      todo.deadline.getHours() === 0 && todo.deadline.getMinutes() === 0
        ? dayjs(todo.deadline).format("YYYY/MM/DD")
        : dayjs(todo.deadline).format("YYYY/MM/DD HH:mm");
  }

  return (
    <div className="flex justify-between group items-start border px-1 border-white">
      <div className="flex justify-start">
        <div className="mt-0.5 mr-1.5">
          <Checkbox
            id={todo.id}
            checked={todo.isDone}
            onCheckedChange={handleIsDoneChange}
          />
        </div>

        <div className="flex-col">
          <div>
            <label
              htmlFor={todo.id}
              className={twMerge(
                "group-hover:font-bold",
                todo.isDone && "line-through text-gray-500"
              )}
            >
              {todo.name}
            </label>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="mr-0">優先度</span>
            <Star
              num={4 - todo.priority}
              className={todo.isDone ? "text-gray-300" : ""}
            />
            {deadlineText && (
              <span
                className={twMerge(
                  "text-sm text-gray-500",
                  isTimeUp && "text-red-500 font-bold"
                )}
              >
                {deadlineText}
                {isTimeUp && (
                  <FontAwesomeIcon icon={faSkull} className="ml-1" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-2 items-center peer">
        <div>
          <Button
            variant="outline"
            onClick={handleEdit}
            className="h-auto px-2 py-1 text-xs"
          >
            <FontAwesomeIcon icon={faPenNib} className="mr-1" />
            <div>編集</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

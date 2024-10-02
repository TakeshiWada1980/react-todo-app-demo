import React, { useState } from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

type Props = {
  addTodo: (todo: Todo) => void;
};

const NewTodoForm = (props: Props) => {
  const { addTodo } = props;
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(3);
  const [deadline, setDeadline] = useState<Date | null>(null);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      name: name,
      isDone: false,
      priority: priority,
      deadline: deadline,
    };
    addTodo(newTodo);
    setName("");
    setPriority(3);
    setDeadline(null);
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updatePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTime = e.target.value;
    setDeadline(dateTime ? new Date(dateTime) : null);
  };

  return (
    <div>
      <div className="border rounded-md p-3 space-y-3">
        <h2 className="font-bold text-lg">Todoの新規作成</h2>
        <form>
          <div className="space-y-2">
            <div className="flex items-center gap-x-2">
              <label htmlFor="todoName" className="font-bold">
                タイトル
              </label>
              <input
                id="todoName"
                type="text"
                value={name}
                onChange={updateName}
                className="border border-gray-400 rounded-md px-2 py-0.5"
              />
            </div>
            <div className="flex gap-5">
              <div className="font-bold">優先度</div>
              {[1, 2, 3].map((value) => (
                <label key={value} className="flex items-center space-x-1">
                  <input
                    id={`priority-${value}`}
                    name="priorityGroup"
                    type="radio"
                    value={value}
                    checked={priority === value}
                    onChange={updatePriority}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-x-2">
              <label htmlFor="deadline" className="font-bold">
                期限
              </label>
              <input
                type="datetime-local"
                id="deadline"
                value={
                  deadline ? dayjs(deadline).format("YYYY-MM-DDTHH:mm") : ""
                }
                onChange={updateDeadline}
                className="border border-gray-400 rounded-md px-2 py-0.5"
              />
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-blue-500 text-sm font-bold rounded-md text-white px-2 py-1 hover:bg-blue-700"
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTodoForm;

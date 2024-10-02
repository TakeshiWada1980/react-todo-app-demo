import { Todo } from "./types";
import { v4 as uuid } from "uuid";

export const initTodos: Todo[] = [
  {
    id: uuid(),
    name: "Reactの勉強 (予習)",
    isDone: false,
    priority: 3,
    deadline: undefined,
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: true,
    priority: 2,
    deadline: undefined,
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 10, 11),
  },
  {
    id: uuid(),
    name: "解析2の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 10, 16, 17),
  },
];

export type Todo = {
  id: string | undefined;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | undefined;
};

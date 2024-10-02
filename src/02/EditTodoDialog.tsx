import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import { v4 as uuid } from "uuid";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { ja } from "react-day-picker/locale";
import * as D from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Star from "./Star";
import { twMerge } from "tailwind-merge";

type Props = {
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  initValue: Todo;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewTodoForm = (props: Props) => {
  const { addTodo, deleteTodo, updateTodo, isOpen, setIsOpen } = props;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [priority, setPriority] = useState(3);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setName(props.initValue.name);
    setPriority(props.initValue.priority);
    setDeadline(props.initValue.deadline);
  }, [props.initValue]);

  useEffect(() => {
    if (name.length <= 2) {
      setNameError("（3文字以上を入力してください）");
    } else {
      setNameError(null);
    }
  }, [name]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.initValue.id) {
      updateTodo({
        id: props.initValue.id,
        name: name,
        isDone: props.initValue.isDone,
        priority: priority,
        deadline: deadline,
      });
    } else {
      addTodo({
        id: uuid(),
        name: name,
        isDone: false,
        priority: priority,
        deadline: deadline,
      });
    }
    setName("");
    setPriority(3);
    setDeadline(undefined);
    setIsOpen(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!props.initValue.id) {
      return;
    }
    deleteTodo(props.initValue.id);
    setName("");
    setPriority(3);
    setDeadline(undefined);
    setIsOpen(false);
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updatePriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(e.target.value));
  };

  return (
    <div>
      <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
        <D.DialogContent>
          <D.DialogHeader>
            <D.DialogTitle>
              {props.initValue.id ? "Todoの編集" : "Todoの新規作成"}
            </D.DialogTitle>
            <D.DialogDescription></D.DialogDescription>
          </D.DialogHeader>
          <form>
            <div className="space-y-5 mb-10">
              {/* 名前 */}
              <div className="space-y-2">
                <div>
                  <label htmlFor="todoName" className="font-bold mr-0.5">
                    タイトル
                  </label>
                  <span className="text-red-500 text-sm">{nameError}</span>
                </div>
                <input
                  id="todoName"
                  type="text"
                  value={name}
                  onChange={updateName}
                  className="border border-gray-400 rounded-md px-2 py-0.5 w-full"
                />
              </div>
              {/* 優先度 */}
              <div className="space-y-2">
                <div className="font-bold">優先度</div>
                <div className="flex justify-items-center space-x-6">
                  {[1, 2, 3].map((value) => (
                    <label key={value}>
                      <div className="flex items-baseline space-x-2">
                        <div>
                          <input
                            id={`priority-${value}`}
                            name="priorityGroup"
                            type="radio"
                            value={value}
                            checked={priority === value}
                            onChange={updatePriority}
                          />
                        </div>
                        <Star num={4 - value} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* 期日 */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-bold">期限</span>
                  <Button
                    type="button"
                    className="ml-2 text-sm h-auto py-0"
                    variant="outline"
                    onClick={() => setDeadline(undefined)}
                  >
                    リセット
                  </Button>
                </div>
                <div className="w-full">
                  <DateTimePicker
                    hourCycle={24}
                    value={deadline}
                    onChange={setDeadline}
                    locale={ja}
                    placeholder="期限の日時を設定"
                  />
                </div>
              </div>
            </div>
            <D.DialogFooter>
              <div className="flex flex-row justify-end gap-3">
                <div className={twMerge(!!nameError && "cursor-not-allowed")}>
                  <Button
                    type="submit"
                    onClick={onSubmit}
                    disabled={!!nameError}
                  >
                    OK
                  </Button>
                </div>
                {props.initValue.id && (
                  <Button variant="secondary" onClick={onDelete}>
                    削除
                  </Button>
                )}
                <D.DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={onCancel}>
                    キャンセル
                  </Button>
                </D.DialogClose>
              </div>
            </D.DialogFooter>
          </form>
        </D.DialogContent>
      </D.Dialog>
    </div>
  );
};

export default NewTodoForm;

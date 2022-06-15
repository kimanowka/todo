import { DetailedHTMLProps, useEffect, useRef, useState } from "react";
import { todos } from "../../types";
import { Button, Modal } from "..";

interface PopupProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  todo: todos;
  toggleCompleted: (id: number) => void;
  toggleFavourite: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  setVisiblePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Popup({
  todo,
  toggleCompleted,
  toggleFavourite,
  deleteTodo,
  editTodo,
  setVisiblePopup,
  ...props
}: PopupProps) {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [inputEditTodo, setInputEditTodo] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputeRef = useRef<HTMLInputElement>(null);
  const disabledButton = value.length > 160;
  useEffect(() => {
    if (inputeRef.current) inputeRef.current.focus();
  }, [inputEditTodo]);
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      }}
      {...props}
    >
      {visibleModal && (
        <Modal
          setVisibleModal={setVisibleModal}
          title={todo.title}
          deleteTodo={deleteTodo}
          idTodo={todo.id}
        />
      )}

      <Button
        onClick={() => {
          toggleFavourite(todo.id);
          setVisiblePopup(false);
        }}
      >
        {todo.favourite ? "Удалить из избранного" : "Добавить в избранное"}
      </Button>
      <Button
        onClick={() => {
          toggleCompleted(todo.id);
          setVisiblePopup(false);
        }}
      >
        {todo.completed ? "Удалить из выполненного" : "Добавить в выполненное"}
      </Button>

      <Button onClick={() => setVisibleModal(true)}>удалить</Button>

      <Button
        onClick={() => {
          setInputEditTodo(true);
        }}
      >
        Редактировать
      </Button>
      {inputEditTodo && (
        <div>
          <input
            ref={inputeRef}
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.currentTarget.value);
            }}
          />
          {value.length > 160 && (
            <span style={{ color: "red", fontSize: "12px" }}>
              Не должно быть больше 160 символов...
            </span>
          )}
          <Button
            onClick={() => {
              editTodo(todo.id, value);
              setVisiblePopup(false);
            }}
            disabled={disabledButton}
          >
            готово
          </Button>
        </div>
      )}
    </div>
  );
}

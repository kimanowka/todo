import { DetailedHTMLProps, useState } from "react";
import styles from "./Todo.module.css";
import { todos } from "../../types";
import { AiOutlineStar } from "react-icons/ai";
import { Button, Popup } from "..";
interface TodoProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  todo: todos;
  toggleFavourite: (id: number) => void;
  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
}

export function Todo({
  todo,
  toggleFavourite,
  toggleCompleted,
  deleteTodo,
  editTodo,
  ...props
}: TodoProps) {
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);

  return (
    <div
      {...props}
      onClick={() => setVisiblePopup(false)}
      className={styles.wrapper}
    >
      <div>
        {todo.favourite && (
          <AiOutlineStar
            style={{ color: "#fb8500" }}
            onClick={() => {
              toggleFavourite(todo.id);
            }}
          />
        )}
        <span className={todo.completed ? styles.completed : ""}>
          {todo.title}
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setVisiblePopup((prev) => !prev);
          }}
        >
          ...
        </Button>
      </div>

      <div>
        {visiblePopup && (
          <Popup
            todo={todo}
            toggleCompleted={toggleCompleted}
            toggleFavourite={toggleFavourite}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            setVisiblePopup={setVisiblePopup}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
          />
        )}
      </div>
    </div>
  );
}

import { DetailedHTMLProps } from "react";
import { Button } from "..";
import styles from "./Modal.module.css";

interface ModalProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  idTodo: number;
  deleteTodo: (id: number) => void;
  title: string;
}

export function Modal({
  setVisibleModal,
  title,
  deleteTodo,
  idTodo,
  ...props
}: ModalProps): JSX.Element {
  return (
    <div
      className={styles.wrapper}
      {...props}
      onClick={() => setVisibleModal(false)}
    >
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Вы действительно хотите удалить ? <h3>{title}</h3>
        <div>
          <Button onClick={() => deleteTodo(idTodo)}>Да</Button>
          <Button onClick={() => setVisibleModal(false)}>Нет</Button>
        </div>
      </div>
    </div>
  );
}

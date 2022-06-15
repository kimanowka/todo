import React, { DetailedHTMLProps, useEffect, useState } from "react";
import { Button } from "..";
import { todos } from "../../types";
import styles from "./AddTodo.module.css";
interface InputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  activeId: number;
  addTodo: (newTodo: todos) => void;
}
export function AddTodo({ addTodo, activeId, ...props }: InputProps) {
  const [value, setValue] = useState<string>("");
  const [blur, setBlur] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSaveTodo = () => {
    if (value.length < 1) {
      setError("Поле не должно быть пустое");
    } else if (value.length > 160) {
      setError(
        `Допустимое количество символов превышено на ${value.length - 160}`
      );
    } else {
      const newTodo = {
        userId: Date.now(),
        id: Date.now(),
        title: value,
        completed: activeId === 2 ? true : false,
        favourite: activeId === 3 ? true : false,
        popup: false,
      };
      addTodo(newTodo);
      setValue("");
      setError("");
    }
  };
  useEffect(() => {
    if (blur && value.length < 1) {
      setError("Поле не должно быть пустое");
    } else {
      setError("");
    }
    if (blur && value.length > 160) {
      setError(
        `Допустимое количество символов превышено на ${value.length - 160}`
      );
    } else {
      setError("");
    }
  }, [blur, value.length]);
  return (
    <label className={styles.wrapper}>
      <div className={styles.wrapper_input}>
        <input
          className={error ? styles.input_error : styles.input}
          {...props}
          placeholder="Название новой задачи"
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value);
          }}
          onBlur={() => {
            setBlur(true);
          }}
        />
        {error && (
          <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
        )}
      </div>

      <Button onClick={handleSaveTodo}>Добавить</Button>
    </label>
  );
}

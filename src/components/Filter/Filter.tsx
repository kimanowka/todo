import { DetailedHTMLProps, useState } from "react";
import styles from "./Filter.module.css";
import { Button } from "..";
import { todos } from "../../types";

interface FilterProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  todos: todos[];
  setFilterTodos: React.Dispatch<React.SetStateAction<todos[]>>;
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
}

export function Filter({
  todos,
  setFilterTodos,
  activeId,
  setActiveId,
  ...props
}: FilterProps) {
  const button = [
    {
      id: 1,
      title: "Все",
      filter: [...todos],
    },
    {
      id: 2,
      title: "Выполненные",
      filter: [...todos].filter((item) => item.completed),
    },
    {
      id: 3,
      title: "Избранные",
      filter: [...todos].filter((item) => item.favourite),
    },
  ];
  return (
    <div {...props}>
      {button.map((item) => (
        <Button
          key={item.id}
          className={activeId === item.id ? styles.active : styles.btn}
          onClick={() => {
            const newTodos = item.filter;
            setFilterTodos(newTodos);
            setActiveId(item.id);
          }}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}

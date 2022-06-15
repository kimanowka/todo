import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { todos } from "./types";
import styles from "./App.module.css";
import { throttle } from "./helper";
import { AddTodo, Filter, ModalError, Todo } from "./components";
const maxLengthTodos = 200;

export default function App(): JSX.Element {
  const [todos, setTodos] = useState<todos[]>([]);
  const [filterTodos, setFilterTodos] = useState<todos[]>(todos);
  const [limitTodos, setLimitTodos] = useState<number>(10);
  const [errorFromServer, setErrorFromServer] = useState<string>("");
  const [activeId, setActiveId] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?_limit=${limitTodos}`)
      .then((res: AxiosResponse<todos[]>) => {
        setTodos(res.data);
      })
      .catch((e) => {
        setErrorFromServer(e.response.status);
      });
  }, [limitTodos]);

  useEffect(() => {
    setFilterTodos(todos);
  }, [todos]);

  const onScroll = throttle((e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setLimitTodos((prev) => prev + 10);
    }
  }, 150);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
  useEffect(() => {
    if (limitTodos >= maxLengthTodos) {
      document.removeEventListener("scroll", onScroll);
    }
  }, [limitTodos, onScroll]);
  const toggleFavourite = (id: number) => {
    setTodos(
      todos.map((item: todos) =>
        item.id === id ? { ...item, favourite: !item.favourite } : { ...item }
      )
    );
  };
  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((item: todos) =>
        item.id === id ? { ...item, completed: !item.completed } : { ...item }
      )
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((item: todos) => item.id !== id));
  };
  const editTodo = (id: number, title: string) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, title: title } : { ...item }
      )
    );
  };
  const addTodo = (newTodo: todos) => {
    setTodos([newTodo, ...todos]);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Filter
          todos={todos}
          setFilterTodos={setFilterTodos}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        <AddTodo addTodo={addTodo} activeId={activeId} />
      </div>
      {filterTodos.map((item: todos) => (
        <div key={item.id}>
          <Todo
            todo={item}
            toggleFavourite={toggleFavourite}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      ))}
      {errorFromServer && (
        <ModalError
          error={errorFromServer}
          setErrorFromServer={setErrorFromServer}
        />
      )}
    </div>
  );
}

import { DetailedHTMLProps, useEffect } from "react";
import { Button } from "../index";
import styles from "./ModalError.module.css";

interface ModalErrorProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  error: string;
  setErrorFromServer: React.Dispatch<React.SetStateAction<string>>;
}

export function ModalError({
  error,
  setErrorFromServer,
  ...props
}: ModalErrorProps): JSX.Element {
  useEffect(() => {
    const intervalId = setTimeout(() => {
      setErrorFromServer("");
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={styles.wrapper} {...props}>
      Упс, возникла ошибка:{error}
      <Button
        onClick={() => {
          setErrorFromServer("");
        }}
      >
        Закрыть
      </Button>
    </div>
  );
}

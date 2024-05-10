import { PlusCircle } from "phosphor-react";
import styles from "./styles.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";

interface InputProps {
  addTask: (task: string) => void;
}

export function Input({ addTask }: InputProps) {
  const [newTask, setNewTask] = useState("");

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    addTask(newTask);
    setNewTask("");
  }

  return (
    <form className={styles.form} onSubmit={handleCreateNewTask}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTask}
        onChange={handleNewTaskChange}
      />
      <button type="submit">
        Criar
        <PlusCircle />
      </button>
    </form>
  );
}

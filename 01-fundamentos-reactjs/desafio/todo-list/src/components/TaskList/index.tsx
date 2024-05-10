import { Check, ClipboardText, PlusCircle, Trash } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";

interface TaskListProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function TaskList() {
  const [newCreateTask, setNewCreateTask] = useState("");
  const [tasks, setTasks] = useState<TaskListProps[]>([]);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = [
      ...tasks,
      { id: uuidv4(), title: newCreateTask, isCompleted: false },
    ];
    setTasks(newTask);
    setNewCreateTask("");
  }

  function handleCompletedTask(id: string) {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTask);
  }

  function deleteTask(id: string) {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  }

  const countCompletedTask = tasks.filter((task) => task.isCompleted).length;

  return (
    <>
      <form className={styles.form} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newCreateTask}
          onChange={(e) => setNewCreateTask(e.target.value)}
        />
        <button type="submit" onClick={handleCreateNewTask}>
          Criar
          <PlusCircle />
        </button>
      </form>

      <div className={styles.container}>
        <div className={styles.tasks__header}>
          <div className={styles.tasks__created}>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.tasks__completed}>
            <p>Concluídas</p>
            <span>
              {tasks.length === 0
                ? 0
                : `${countCompletedTask} de ${tasks.length}`}
            </span>
          </div>
        </div>
        <div className={styles.content}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className={styles.task__card} key={task.id}>
                <div
                  className={`${styles.task__check} ${
                    task.isCompleted ? styles.checked : ""
                  }`}
                  onClick={() => handleCompletedTask(task.id)}
                >
                  {task.isCompleted && <Check />}
                </div>
                <p
                  className={`${styles.task_text} ${
                    task.isCompleted ? styles.checked : ""
                  }`}
                >
                  {task.title}
                </p>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className={styles.button__delete}
                >
                  <Trash size={24} />
                </button>
              </div>
            ))
          ) : (
            <div className={styles.content__notask}>
              <ClipboardText />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

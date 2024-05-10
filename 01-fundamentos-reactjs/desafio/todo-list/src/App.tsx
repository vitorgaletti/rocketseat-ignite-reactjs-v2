import { Header } from "./components/Header";

import styles from "./app.module.scss";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <TaskList />
      </main>
    </>
  );
}

export default App;

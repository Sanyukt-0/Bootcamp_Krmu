import "./index.css";
import CounterPanel from "./Task1";
import NameCard from "./Task2";
import ThemeSwitcher from "./Task3_";
import PasswordField from "./Task4";
import ToDoList from "./Task5";

function App() {
  return (
    <main className="wrapper">
      <h1>React Practice Tasks</h1>
      <CounterPanel />
      <NameCard />
      <ThemeSwitcher />
      <PasswordField />
      <ToDoList />

      </main>
  );
}

export default App;

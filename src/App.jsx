import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container mx-auto w-2xl h-[100vh] flex flex-col justify-center items-center gap-4">
      <p className="text-6xl font-bold bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
        Todo list
      </p>
      <TodoAdd />
      <TodoList />
    </div>
  );
}

export default App;

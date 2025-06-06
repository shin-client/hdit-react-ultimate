import { useState } from "react";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (value) => {
    const newTodo = {
      id: Math.round(Math.random() * 100000000),
      todoName: value,
    };
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="container mx-auto w-2xl h-[100vh] flex flex-col justify-center items-center gap-4">
      <p className="text-6xl font-bold bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
        Todo list
      </p>
      <TodoAdd addNewTodo={addNewTodo} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default App;

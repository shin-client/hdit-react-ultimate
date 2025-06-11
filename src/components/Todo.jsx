import { useState } from "react";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (value) => {
    const newTodo = {
      id: Math.round(Math.random() * 100000000),
      todoName: value,
    };
    setTodoList([...todoList, newTodo]);
  };
  return (
    <div className="mx-auto my-10 flex w-2xl flex-col items-center justify-center gap-4">
      <p className="bg-gradient-to-bl from-violet-500 to-fuchsia-500 bg-clip-text text-6xl font-bold text-transparent">
        Todo list
      </p>
      <TodoAdd addNewTodo={addNewTodo} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};
export default Todo;

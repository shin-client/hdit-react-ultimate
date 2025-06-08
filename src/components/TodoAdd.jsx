import { useState } from "react";

const TodoAdd = ({ addNewTodo }) => {
  const [valueInput, setValueInput] = useState("");

  const handleAddTodo = () => {
    if (valueInput.trim() !== "") {
      addNewTodo(valueInput);
      setValueInput("");
    }
  };

  return (
    <div className="space-x-10">
      <input
        type="text"
        value={valueInput}
        className="rounded bg-gray-100 px-4 py-2 outline-none"
        placeholder="Enter your task"
        onChange={(e) => setValueInput(e.target.value)}
      />
      <button
        className="cursor-pointer rounded bg-blue-400 px-4 py-2 text-white transition-colors hover:opacity-85"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
};
export default TodoAdd;

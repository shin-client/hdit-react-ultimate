import { useState } from "react";

const TodoAdd = ({addNewTodo}) => {
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
        className="bg-gray-100 outline-none rounded px-4 py-2"
        placeholder="Enter your task"
        onChange={(e) => setValueInput(e.target.value)}
      />
      <button
        className="bg-blue-400 px-4 py-2 text-white rounded cursor-pointer hover:opacity-85 transition-colors"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
};
export default TodoAdd;

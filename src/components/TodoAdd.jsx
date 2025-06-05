const TodoAdd = () => {
  return (
    <div className="space-x-10">
      <input
        type="text"
        className="bg-gray-100 outline-none rounded px-4 py-2"
        placeholder="Enter your task"
      />
      <button className="bg-blue-400 px-4 py-2 text-white rounded cursor-pointer hover:opacity-85 transition-colors">
        Add test2
      </button>
    </div>
  );
};
export default TodoAdd;

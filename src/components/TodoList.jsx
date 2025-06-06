import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = ({ todoList, setTodoList }) => {
  return (
    <>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <tbody className="divide-y divide-gray-200">
          {todoList.map((todo) => {
            return (
              <tr
                key={todo.id}
                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50"
              >
                <td className="whitespace-nowrap text-sm font-medium text-gray-900">
                  {todo.todoName}
                </td>
                <td className="flex gap-2">
                  <div className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors cursor-pointer">
                    <FaTrash
                      className="text-red-500"
                      onClick={() => {
                        setTodoList(
                          todoList.filter((td) => td.id !== todo.id)
                        );
                      }}
                    />
                  </div>
                  <div className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors cursor-pointer">
                    <FaEdit className="text-blue-500" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="text-red-500 font-medium px-5 py-3 bg-gray-100 hover:bg-red-100 transition-colors rounded-lg cursor-pointer"
        onClick={() => {setTodoList([])}}
      >
        Delete All
      </button>
    </>
  );
};
export default TodoList;

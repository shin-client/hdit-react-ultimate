import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = ({ todoList, setTodoList }) => {
  return (
    <>
      <table className="min-w-full overflow-hidden rounded-lg border border-gray-300">
        <tbody className="divide-y divide-gray-200">
          {todoList.map((todo) => {
            return (
              <tr
                key={todo.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <td className="text-sm font-medium whitespace-nowrap text-gray-900">
                  {todo.todoName}
                </td>
                <td className="flex gap-2">
                  <div className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors hover:bg-red-100">
                    <FaTrash
                      className="text-red-500"
                      onClick={() => {
                        setTodoList(todoList.filter((td) => td.id !== todo.id));
                      }}
                    />
                  </div>
                  <div className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors hover:bg-blue-100">
                    <FaEdit className="text-blue-500" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {todoList.length !== 0 ? (
        <button
          className="cursor-pointer rounded-lg bg-gray-100 px-5 py-3 font-medium text-red-500 transition-colors hover:bg-red-100"
          onClick={() => {
            setTodoList([]);
          }}
        >
          Delete All
        </button>
      ) : (
        ""
      )}
    </>
  );
};
export default TodoList;

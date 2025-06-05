import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = () => {
  return (
    <>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <tbody className="divide-y divide-gray-200">
          <tr className="flex justify-between items-center px-6 py-4 hover:bg-gray-50">
            <td className="whitespace-nowrap text-sm font-medium text-gray-900">
              Doing homework
            </td>
            <td className="flex gap-2">
              <div className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors cursor-pointer">
                <FaTrash className="text-red-500" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors cursor-pointer">
                <FaEdit className="text-blue-500" />
              </div>
            </td>
          </tr>
          <tr className="flex justify-between items-center px-6 py-4 hover:bg-gray-50">
            <td className="whitespace-nowrap text-sm font-medium text-gray-900">
              Watching Youtube
            </td>
            <td className="flex gap-2">
              <div className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors cursor-pointer">
                <FaTrash className="text-red-500" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors cursor-pointer">
                <FaEdit className="text-blue-500" />
              </div>
            </td>
          </tr>
          <tr className="flex justify-between items-center px-6 py-4 hover:bg-gray-50">
            <td className="whitespace-nowrap text-sm font-medium text-gray-900">
              Learning English
            </td>
            <td className="flex gap-2">
              <div className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors cursor-pointer">
                <FaTrash className="text-red-500" />
              </div>
              <div className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors cursor-pointer">
                <FaEdit className="text-blue-500" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="text-red-500 font-medium px-5 py-3 bg-gray-100 hover:bg-red-100 transition-colors rounded-lg cursor-pointer">
        Delete All
      </button>
    </>
  );
};
export default TodoList;

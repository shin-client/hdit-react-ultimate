import { Table } from "antd";
import UserUpdateModal from "./UserUpdateModal";

const UserTable = ({ userData }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <a>{id}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: () => <UserUpdateModal />,
    },
  ];

  return <Table columns={columns} dataSource={userData} rowKey={"_id"} />;
};
export default UserTable;

import { Table } from "antd";

const UserTable = ({ userData }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return <Table columns={columns} dataSource={userData} rowKey={"_id"} />;
};
export default UserTable;

import { Space, Table } from "antd";
import UserUpdateModal from "./UserUpdateModal";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserDetail from "./UserDetail";

const UserTable = ({ userData, fetchData }) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [currUserData, setCurrUserData] = useState();

  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

  const columns = [
    {
      title: "ID",
      render: (record) => (
        <a
          onClick={() => {
            setIsUserDetailOpen(true);
            setCurrUserData(record);
          }}
        >
          {record._id}
        </a>
      ),
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
      render: (record) => (
        <Space size="middle">
          <EditOutlined
            className="cursor-pointer text-lg text-yellow-400!"
            onClick={() => {
              setIsModalUpdateOpen(true);
              setCurrUserData(record);
            }}
          />
          <DeleteOutlined className="cursor-pointer text-lg text-red-500!" />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={userData} rowKey={"_id"} />
      <UserUpdateModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        currUserData={currUserData}
        setCurrUserData={setCurrUserData}
        fetchData={fetchData}
      />
      <UserDetail
        isUserDetailOpen={isUserDetailOpen}
        setIsUserDetailOpen={setIsUserDetailOpen}
        currUserData={currUserData || []}
      />
    </>
  );
};
export default UserTable;

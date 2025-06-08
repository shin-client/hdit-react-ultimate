import { message, Popconfirm, Space, Table } from "antd";
import UserUpdateModal from "./UserUpdateModal";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserDetail from "./UserDetail";
import { deleteUserAPI } from "@services/apiService";

const UserTable = ({ userData, fetchData }) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [currUserData, setCurrUserData] = useState();

  const handleDeleteUser = async (record) => {
    const res = await deleteUserAPI(record._id);
    if (res?.data) {
      fetchData();
      message.success("Deleted");
    } else {
      message.error(res?.message);
    }
  };

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
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            placement="left"
            onConfirm={() => handleDeleteUser(record)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="cursor-pointer text-lg text-red-500!" />
          </Popconfirm>
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

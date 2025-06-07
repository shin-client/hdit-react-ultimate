import { fetchAllUserAPI } from "@/services/apiService";
import { Table } from "antd";
import { useEffect, useState } from "react";

const UserTable = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAllUserAPI();
      setUserData(res.data);
    };
    fetchData();
  }, []);

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

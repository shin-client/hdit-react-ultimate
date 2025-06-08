import UserForm from "@components/users/UserForm";
import UserTable from "@components/users/UserTable";
import { fetchAllUserAPI } from "@services/apiService";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const res = await fetchAllUserAPI();
    setUserData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl space-y-4">
      <UserForm fetchData={fetchData} />
      <UserTable userData={userData} fetchData={fetchData} />
    </div>
  );
};
export default UsersPage;

import UserForm from "@components/users/UserForm";
import UserTable from "@components/users/UserTable";
import { fetchAllUserAPI } from "@services/apiService";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [userData, setUserData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();

  const fetchData = async () => {
    const res = await fetchAllUserAPI(currPage, pageSize);
    setCurrPage(+res.data.meta.current);
    setPageSize(+res.data.meta.pageSize);
    setTotalPage(res.data.meta.total);
    setUserData(res.data.result);
  };
  useEffect(() => {
    fetchData();
  }, [currPage]);

  return (
    <div className="mx-auto max-w-screen-xl space-y-4">
      <UserForm fetchData={fetchData} />
      <UserTable
        userData={userData}
        setUserData={setUserData}
        fetchData={fetchData}
        currPage={currPage}
        pageSize={pageSize}
        totalPage={totalPage}
        setCurrPage={setCurrPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
export default UsersPage;

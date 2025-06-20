import UserFormModal from "@components/users/UserFormModal";
import UserTable from "@components/users/UserTable";
import { fetchAllUserAPI } from "@services/apiService";
import {
  UsergroupAddOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Typography, Statistic, Row, Col, Button } from "antd";
import { useEffect, useState, useCallback } from "react";

const { Title, Text } = Typography;

const UsersPage = () => {
  const [userData, setUserData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const res = await fetchAllUserAPI(currPage, pageSize);
    setCurrPage(+res.data.meta.current);
    setPageSize(+res.data.meta.pageSize);
    setTotalPage(res.data.meta.total);
    setUserData(res.data.result);
    setIsLoading(false);
  }, [currPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="bg-gray-50 px-6 pt-6 pb-6">
      {/* Remove min-h-screen since App.jsx handles the layout */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <UsergroupAddOutlined className="text-2xl text-blue-600" />
              </div>
              <div>
                <Title level={2} className="mb-0 text-gray-800">
                  User Management
                </Title>
                <Text type="secondary" className="text-base">
                  Manage and organize your users efficiently
                </Text>
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              className="h-10 rounded-lg border-0 bg-blue-600 shadow-lg hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              Add New User
            </Button>
          </div>
        </div>
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={8}>
            <Card className="border-0 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <Statistic
                title="Total Users"
                value={totalPage || 0}
                prefix={<UserOutlined className="text-blue-600" />}
                valueStyle={{
                  color: "#1890ff",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card className="border-0 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <Statistic
                title="Current Page"
                value={currPage}
                valueStyle={{
                  color: "#52c41a",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card className="border-0 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <Statistic
                title="Page Size"
                value={pageSize}
                valueStyle={{
                  color: "#722ed1",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
        </Row>
        <UserFormModal
          fetchData={fetchData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {/* User Table with built-in modern design */}
        <UserTable
          userData={userData}
          setUserData={setUserData}
          fetchData={fetchData}
          currPage={currPage}
          pageSize={pageSize}
          totalPage={totalPage}
          setCurrPage={setCurrPage}
          setPageSize={setPageSize}
          fetchDataLoading={isLoading}
        />
      </div>
    </div>
  );
};
export default UsersPage;

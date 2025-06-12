import {
  message,
  Popconfirm,
  Space,
  Table,
  Avatar,
  Tag,
  Button,
  Tooltip,
  Input,
  Select,
  Typography,
  Badge,
} from "antd";
import UserUpdateModal from "./UserUpdateModal";
import { useState, useMemo } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import UserDetail from "./UserDetail";
import { deleteUserAPI } from "@services/apiService";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const UserTable = ({
  userData,
  fetchData,
  currPage,
  pageSize,
  totalPage,
  setCurrPage,
  setPageSize,
  fetchDataLoading,
}) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [currUserData, setCurrUserData] = useState();
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async (record) => {
    setLoading(true);
    const res = await deleteUserAPI(record._id);
    if (res?.data) {
      fetchData();
      message.success("User deleted successfully!");
    } else {
      message.error(res?.message || "Failed to delete user");
    }
    setLoading(false);
  };

  // Filter userData based on search and role filter
  const filteredData = useMemo(() => {
    return (
      userData?.filter((user) => {
        const matchesSearch =
          !searchText ||
          user.email?.toLowerCase().includes(searchText.toLowerCase());

        const matchesRole = filterRole === "ALL" || user.role === filterRole;

        return matchesSearch && matchesRole;
      }) || []
    );
  }, [userData, searchText, filterRole]);

  const columns = [
    {
      title: "No.",
      width: 10,
      fixed: "left",
      render: (text, record, index) => (
        <div className="text-center">
          <Badge
            count={index + 1 + (currPage - 1) * pageSize}
            style={{
              backgroundColor: "#f0f0f0",
              color: "#666",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        </div>
      ),
    },
    {
      title: "User",
      width: 200,
      fixed: "left",
      render: (record) => (
        <div className={`flex items-center space-x-3!`}>
          <Avatar
            size={40}
            src={
              record.avatar
                ? `${import.meta.env.VITE_API_URL}/images/avatar/${record.avatar}`
                : undefined
            }
            icon={<UserOutlined />}
            className={`"border-blue-100" border-2`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <Text
                strong
                className={`cursor-pointer text-gray-800 transition-colors hover:text-blue-600!`}
                onClick={() => {
                  setIsUserDetailOpen(true);
                  setCurrUserData(record);
                }}
              >
                {record.fullName || "N/A"}
              </Text>
              {record.role && (
                <Tag
                  color={record.role === "ADMIN" ? "red" : "blue"}
                  className="text-xs font-bold"
                >
                  {record.role}
                </Tag>
              )}
            </div>
            <div className="mt-1 flex items-center space-x-1 text-sm text-gray-500">
              <MailOutlined className="text-xs" />
              <Text type="secondary" className="truncate">
                {record.email}
              </Text>
            </div>
            {record.phone && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <PhoneOutlined className="text-xs" />
                <Text type="secondary">{record.phone}</Text>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "User ID",
      dataIndex: "_id",
      width: 120,
      render: (id) => (
        <Tooltip title={"Click to copy"}>
          <Text
            code
            className={`cursor-pointer text-xs`}
            onClick={() => {
              navigator.clipboard.writeText(id);
              message.success("copied");
            }}
          >
            {id ? `${id.substring(0, 12)}...` : "N/A"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      width: 100,
      render: (record) => (
        <div className="text-center">
          <Tag
            color={record.isActive !== false ? "success" : "error"}
            className={`px-3} rounded-full`}
          >
            {record.isActive !== false ? "Active" : "Inactive"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      width: 120,
      render: (date) => (
        <div className={`text-center`}>
          <Text className="text-sm">
            {date ? new Date(date).toLocaleDateString("vi-VN") : "N/A"}
          </Text>
          <div className="text-xs text-gray-400">
            {date
              ? new Date(date).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      width: 120,
      fixed: "right",
      render: (record) => (
        <Space size="small" className="flex justify-center">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              className="text-blue-600! hover:bg-blue-50! hover:text-blue-800!"
              onClick={() => {
                setIsUserDetailOpen(true);
                setCurrUserData(record);
              }}
            />
          </Tooltip>

          <Tooltip title="Edit User">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              className="text-yellow-600! hover:bg-yellow-50! hover:text-yellow-800!"
              onClick={() => {
                setIsModalUpdateOpen(true);
                setCurrUserData(record);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Delete User"
            description={
              <div>
                <p>Are you sure you want to delete this user?</p>
                <p className="mt-1 text-sm text-red-500">
                  This action cannot be undone!
                </p>
              </div>
            }
            placement="topRight"
            onConfirm={() => handleDeleteUser(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true, loading }}
          >
            <Tooltip title="Delete User">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                className="text-red-600! hover:bg-red-50! hover:text-red-800!"
                loading={loading}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleChangePagination = (pagination) => {
    if (pagination.current !== currPage || pagination.pageSize !== pageSize) {
      setCurrPage(pagination.current);
      setPageSize(+pagination.pageSize);
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* Header với Search và Filters */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              User Management
            </h3>
            <p className="text-sm text-gray-500">
              Manage and organize your users with advanced filtering and search
              capabilities
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <Search
              placeholder="Search users by email"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full lg:w-80"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={setSearchText}
            />

            <Select
              placeholder="Filter by role"
              size="large"
              className="w-full lg:w-40"
              value={filterRole}
              onChange={setFilterRole}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="ALL">All Roles</Option>
              <Option value="ADMIN">Admin</Option>
              <Option value="USER">User</Option>
            </Select>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="rounded-lg bg-blue-50 px-4 py-2">
            <Text className="text-sm font-medium text-blue-600">
              Total Users: <strong>{userData?.length || 0}</strong>
            </Text>
          </div>
          <div className="rounded-lg bg-green-50 px-4 py-2">
            <Text className="text-sm font-medium text-green-600">
              Filtered: <strong>{filteredData.length}</strong>
            </Text>
          </div>
          {searchText && (
            <div className="rounded-lg bg-orange-50 px-4 py-2">
              <Text className="text-sm font-medium text-orange-600">
                Search: "<strong>{searchText}</strong>"
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="p-6">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="_id"
          loading={loading || fetchDataLoading}
          className="modern-user-table"
          pagination={{
            current: currPage,
            pageSize: pageSize,
            total: totalPage,
            showSizeChanger: true,
            showTotal: (total, range) => (
              <div className="text-gray-600">
                Showing{" "}
                <strong>
                  {range[0]}-{range[1]}
                </strong>{" "}
                of <strong>{total}</strong> users
              </div>
            ),
            pageSizeOptions: ["10", "20", "50", "100"],
            className: "mt-4",
          }}
          onChange={handleChangePagination}
          locale={{
            emptyText: (
              <div className="py-8 text-center">
                <UserOutlined className="mb-2 text-4xl text-gray-300" />
                <p className="mb-1 text-gray-500">No users found</p>
                <p className="text-sm text-gray-400">
                  {searchText
                    ? "Try adjusting your search criteria"
                    : "Add some users to get started"}
                </p>
              </div>
            ),
          }}
        />
      </div>

      {/* Modals */}
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
        currUserData={currUserData || {}}
        fetchData={fetchData}
      />
    </div>
  );
};
export default UserTable;

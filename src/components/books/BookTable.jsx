import {
  message,
  Popconfirm,
  Space,
  Table,
  Avatar,
  Button,
  Tooltip,
  Input,
  Select,
  Typography,
  Badge,
} from "antd";
import { useState, useMemo } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { deleteBookAPI } from "@services/apiService";
import { useBookContext } from "@pages/BooksPage";
import BookDetail from "./BookDetail";
import BookUpdateModal from "./BookUpdateModal";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const BookTable = () => {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const {
    bookData,
    currPage,
    pageSize,
    totalPage,
    setCurrPage,
    setPageSize,
    fetchBooksData,
    setIsBookDetailOpen,
    setCurrBookData,
    setIsModalUpdateOpen,
    isLoading: contextLoading,
  } = useBookContext();

  const handleDeleteBook = async (record) => {
    setLoading(true);
    const res = await deleteBookAPI(record._id);
    if (res?.data) {
      fetchBooksData();
      message.success("Book deleted successfully!");
    } else {
      message.error(res?.message || "Failed to delete book");
    }
    setLoading(false);
  };
  // Filter userData based on search and role filter
  const filteredData = useMemo(() => {
    // Defensive check to ensure bookData is always an array
    const safeBookData = Array.isArray(bookData) ? bookData : [];

    return safeBookData.filter((book) => {
      const matchesSearch =
        !searchText ||
        book.mainText?.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory =
        filterCategory === "ALL" || book.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [bookData, searchText, filterCategory]);

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
      title: "Book",
      width: 200,
      fixed: "left",
      render: (record) => (
        <div className={`flex items-center space-x-3!`}>
          <Avatar
            size={40}
            src={
              record.thumbnail
                ? `${import.meta.env.VITE_API_URL}/images/book/${record.thumbnail}`
                : undefined
            }
            className={`"border-blue-100" border-2`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <Text
                strong
                className={`cursor-pointer text-gray-800 transition-colors hover:text-blue-600!`}
                onClick={() => {
                  setIsBookDetailOpen(true);
                  setCurrBookData(record);
                }}
              >
                {record.mainText || "N/A"}
              </Text>
            </div>
            <div className="mt-1 flex items-center space-x-1 text-sm text-gray-500">
              <UserOutlined className="text-xs" />
              <Text type="secondary" className="truncate">
                {record.author}
              </Text>
            </div>
            {record.category && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <BookOutlined className="text-xs" />
                <Text type="secondary">{record.category}</Text>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 120,
      render: (price) => (
        <Text className={`text-xs`}>
          {new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </Text>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 120,
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
                setIsBookDetailOpen(true);
                setCurrBookData(record);
              }}
            />
          </Tooltip>

          <Tooltip title="Edit book">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              className="text-yellow-600! hover:bg-yellow-50! hover:text-yellow-800!"
              onClick={() => {
                setIsModalUpdateOpen(true);
                setCurrBookData(record);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Delete book"
            description={
              <div>
                <p>Are you sure you want to delete this book?</p>
                <p className="mt-1 text-sm text-red-500">
                  This action cannot be undone!
                </p>
              </div>
            }
            placement="topRight"
            onConfirm={() => handleDeleteBook(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true, loading }}
          >
            <Tooltip title="Delete Book">
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
              Book Management
            </h3>
            <p className="text-sm text-gray-500">Manage the books</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <Search
              placeholder="Search books by name"
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
              value={filterCategory}
              onChange={setFilterCategory}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="ALL">All Roles</Option>
              <Option value="Arts">Arts</Option>
              <Option value="Teen">Teen</Option>
            </Select>
          </div>
        </div>
        {/* Stats Row */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="rounded-lg bg-blue-50 px-4 py-2">
            <Text className="text-sm font-medium text-blue-600">
              Total Books:
              <strong>{Array.isArray(bookData) ? bookData.length : 0}</strong>
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
          loading={loading || contextLoading}
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
                of <strong>{total}</strong> books
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
                <p className="mb-1 text-gray-500">No books found</p>
                <p className="text-sm text-gray-400">
                  {searchText
                    ? "Try adjusting your search criteria"
                    : "Add some books to get started"}
                </p>
              </div>
            ),
          }}
        />
      </div>
      {/* Modals */}
      <BookUpdateModal />
      <BookDetail />
    </div>
  );
};
export default BookTable;

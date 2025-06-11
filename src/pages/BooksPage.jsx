import {
  UsergroupAddOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddNewBook from "@components/books/AddNewBook";
import BookTable from "@components/books/BookTable";
import { fetchAllBookAPI } from "@services/apiService";
import { Card, Typography, Statistic, Row, Col, Button } from "antd";
import {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";

const { Title, Text } = Typography;

const BookContext = createContext({
  bookData: [],
  currPage: 1,
  pageSize: 10,
  totalPage: 0,
  setCurrPage: () => {},
  setPageSize: () => {},
  fetchBooksData: () => {},
  isBookDetailOpen: false,
  setIsBookDetailOpen: () => {},
  currBookData: {},
  setCurrBookData: () => {},
  isModalUpdateOpen: false,
  setIsModalUpdateOpen: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  isLoading: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error(
      "useBookContext must be used within a BookContext.Provider",
    );
  }
  return context;
};

const Bookspage = () => {
  const [bookData, setBookData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [isBookDetailOpen, setIsBookDetailOpen] = useState(false);
  const [currBookData, setCurrBookData] = useState({});
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  const fetchBooksData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllBookAPI(currPage, pageSize);
      if (res?.data) {
        setCurrPage(+res.data.meta.current);
        setPageSize(+res.data.meta.pageSize);
        setTotalPage(res.data.meta.total);
        setBookData(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBookData([]);
    } finally {
      setIsLoading(false);
    }
  }, [currPage, pageSize]);

  useEffect(() => {
    fetchBooksData();
  }, [fetchBooksData]);
  return (    <BookContext.Provider
      value={{
        bookData,
        currPage,
        pageSize,
        totalPage,
        setCurrPage,
        setPageSize,
        fetchBooksData,
        isBookDetailOpen,
        setIsBookDetailOpen,
        currBookData,
        setCurrBookData,
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        isModalOpen,
        setIsModalOpen,
        isLoading,
      }}
    >
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
                    Book Management
                  </Title>
                  <Text type="secondary" className="text-base">
                    Manage The Books
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
                Add New Book
              </Button>
            </div>
          </div>
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} sm={12} lg={8}>
              <Card className="border-0 shadow-md transition-shadow duration-200 hover:shadow-lg">
                <Statistic
                  title="Total Books"
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
          <AddNewBook />
          <BookTable />
        </div>
      </div>
    </BookContext.Provider>
  );
};
export default Bookspage;

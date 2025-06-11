import { PlusOutlined, BookOutlined } from "@ant-design/icons";
import AddNewBook from "@components/books/AddNewBook";
import BookTable from "@components/books/BookTable";
import { useBookContext } from "@context/BookProvider";
import { Card, Typography, Statistic, Row, Col, Button } from "antd";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Bookspage = () => {
  const { fetchBooksData, setIsModalOpen, totalPage, currPage, pageSize } =
    useBookContext();

  useEffect(() => {
    fetchBooksData();
  }, [fetchBooksData]);

  return (
    <div className="bg-gray-50 px-6 pt-6 pb-6">
      {/* Remove min-h-screen since App.jsx handles the layout */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BookOutlined className="text-2xl text-blue-600" />
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
                prefix={<BookOutlined className="text-blue-600" />}
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
  );
};
export default Bookspage;

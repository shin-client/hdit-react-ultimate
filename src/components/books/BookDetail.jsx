import {
  UploadOutlined,
  UserOutlined,
  IdcardOutlined,
  CalendarOutlined,
  BookOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useBookContext } from "@context/BookProvider";
import { handleUploadFile, updateBookAPI } from "@services/apiService";
import {
  Button,
  Drawer,
  message,
  Typography,
  Upload,
  Card,
  Spin,
  Image,
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const BookDetail = () => {
  const {
    isBookDetailOpen,
    setIsBookDetailOpen,
    currBookData,
    fetchBooksData,
  } = useBookContext();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [uploading, setUploading] = useState(false);
  const resetUploadState = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const props = {
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJpgOrPng) {
        message.error(`${file.name} is not a png/jpg file`);
        return Upload.LIST_IGNORE;
      }
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return Upload.LIST_IGNORE;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      return false;
    },
    maxCount: 1,
    fileList: selectedFile ? [selectedFile] : [],
  };
  const handleUpdateBookThumbnail = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const res = await handleUploadFile(selectedFile, "book");
    if (res?.data) {
      const newThumbnail = res.data.fileUploaded;
      currBookData.thumbnail = newThumbnail;
      const resUpdateThumbnail = await updateBookAPI(
        currBookData._id,
        newThumbnail,
        currBookData.mainText,
        currBookData.author,
        currBookData.price,
        currBookData.quantity,
        currBookData.category,
      );

      if (resUpdateThumbnail?.data) {
        message.success("Thumbnail updated successfully!");
        resetUploadState();
        fetchBooksData();
      } else {
        message.error(`${resUpdateThumbnail.message}`);
      }
    } else {
      message.error(`${res.message}`);
    }
    setUploading(false);
  };
  return (
    <Drawer
      title={
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <BookOutlined className="text-lg text-blue-600" />
          </div>
          <div>
            <Title level={4} className="mb-0 text-gray-800">
              Book Details
            </Title>
            <Text type="secondary" className="text-sm">
              View and manage book information
            </Text>
          </div>
        </div>
      }
      placement="right"
      onClose={() => {
        setIsBookDetailOpen(false);
        resetUploadState();
      }}
      open={isBookDetailOpen}
      width={420}
      className="book-detail-drawer"
      styles={{
        body: { padding: "16px", backgroundColor: "#fafafa" },
        header: { padding: "16px 24px" },
      }}
      breakpoint="md"
    >
      <div className="space-y-6!">
        {/* Thumbnail Section */}
        <Card className="border-0 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="group relative">
              <Image
                src={
                  currBookData.thumbnail
                    ? `${import.meta.env.VITE_API_URL}/images/book/${currBookData.thumbnail}`
                    : undefined
                }
              />
              {uploading && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black">
                  <Spin size="large" />
                </div>
              )}
            </div>

            <div className="text-center">
              <Title level={5} className="mb-1">
                {currBookData.mainText}
              </Title>
              <Text type="secondary">{currBookData.author}</Text>
            </div>

            <div className="w-full">
              <Upload {...props} className="w-full">
                <Button
                  icon={<UploadOutlined />}
                  className="w-full rounded-lg"
                  size="large"
                >
                  Change thumbnail
                </Button>
              </Upload>

              {preview && (
                <div className="mt-4 space-y-3">
                  <div className="text-center">
                    <img
                      className="mx-auto max-w-[200px] rounded-lg shadow-md"
                      src={preview}
                      alt="Preview"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="primary"
                      onClick={handleUpdateBookThumbnail}
                      loading={uploading}
                      className="flex-1 rounded-lg border-0 bg-green-600 hover:bg-green-700"
                    >
                      Save Thumbnail
                    </Button>
                    <Button
                      onClick={resetUploadState}
                      className="flex-1 rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
        {/* Book Information Section */}
        <Card
          className="border-0 shadow-sm transition-shadow duration-200 hover:shadow-md"
          title={
            <div className="flex items-center space-x-2">
              <IdcardOutlined className="text-blue-600" />
              <span>Book Information</span>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <IdcardOutlined className="text-sm text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Book ID
                </Text>
                <div className="truncate font-mono text-sm text-gray-800">
                  {currBookData._id}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <BookOutlined className="text-sm text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Book Name
                </Text>
                <div className="font-medium text-gray-800">
                  {currBookData.mainText}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <MoneyCollectOutlined className="text-sm text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Price
                </Text>
                <div className="truncate font-medium text-gray-800">
                  {new Intl.NumberFormat("vi", {
                    style: "currency",
                    currency: "VND",
                  }).format(currBookData.price)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <UserOutlined className="text-sm text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Author
                </Text>
                <div className="truncate font-medium text-gray-800">
                  {currBookData.author}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <BookOutlined className="text-sm text-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Category
                </Text>
                <div className="font-medium text-gray-800">
                  {currBookData.category}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <CalendarOutlined className="text-sm text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Published date
                </Text>
                <div className="text-sm font-medium text-gray-800">
                  {formatDate(currBookData.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <CalendarOutlined className="text-sm text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Last updated
                </Text>
                <div className="text-sm font-medium text-gray-800">
                  {formatDate(currBookData.updatedAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <CalendarOutlined className="text-sm text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Sold
                </Text>
                <div className="text-sm font-medium text-gray-800">
                  {currBookData.sold}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Drawer>
  );
};
export default BookDetail;

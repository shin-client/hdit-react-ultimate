import { openNotification } from "@libs/utils";
import { handleUploadFile, updateBookAPI } from "@services/apiService";
import {
  BookOutlined,
  LockOutlined,
  UserOutlined,
  UploadOutlined,
  MoneyCollectOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import {
  Input,
  message,
  Modal,
  Upload,
  Form,
  Button,
  Card,
  InputNumber,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useBookContext } from "@context/BookProvider";

const BookUpdateModal = () => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    currBookData,
    fetchBooksData,
  } = useBookContext();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (currBookData) {
      setPreview(
        `${import.meta.env.VITE_API_URL}/images/book/${currBookData.thumbnail}`,
      );
      form.setFieldsValue({
        id: currBookData._id,
        thumbnail: currBookData.thumbnail,
        mainText: currBookData.mainText,
        author: currBookData.author,
        price: currBookData.price,
        quantity: currBookData.quantity,
        category: currBookData.category,
      });
    }
  }, [currBookData, form]);

  const handleUpdateBook = async (values) => {
    if (selectedFile) {
      const resUploadFile = await handleUploadFile(selectedFile, "book");
      values.thumbnail = resUploadFile.data.fileUploaded;
    }
    const res = await updateBookAPI(
      values.id,
      values.thumbnail,
      values.mainText,
      values.author,
      values.price,
      values.quantity,
      values.category,
    );
    if (res?.data) {
      message.success("Update book success!");
      resetAndCloseModal();
      fetchBooksData();
    } else {
      openNotification(
        "error",
        "Update book error",
        JSON.stringify(res.message),
      );
    }
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setIsModalUpdateOpen(false);
  };

  const resetUploadState = () => {
    setSelectedFile(null);
    setPreview(null);
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

  return (
    <>
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <BookOutlined className="text-blue-600" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Update Book
            </span>
          </div>
        }
        open={isModalUpdateOpen}
        onOk={() => form.submit()}
        onCancel={resetAndCloseModal}
        okText={"Update"}
        centered
        forceRender
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateBook}
          size="large"
          className="space-y-4"
        >
          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            rules={[{ required: true, message: "Please upload thumbnail!" }]}
          >
            <Card className="border-0 shadow-sm transition-shadow duration-200">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full">
                  <Upload {...props} className="w-full">
                    <Button
                      icon={<UploadOutlined />}
                      className="w-full rounded-lg"
                      size="large"
                    >
                      Upload thumbnail
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
                      <div className="flex">
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
          </Form.Item>
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-400" />}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Book Name"
            name="mainText"
            rules={[{ required: true, message: "Please enter the Book name!" }]}
          >
            <Input
              prefix={<BookOutlined className="text-gray-400" />}
              placeholder="Enter book name"
              // onChange={(e) => setMainText(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Author Name"
            name="author"
            rules={[{ required: true, message: "Please enter author name!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Enter author name"
              // onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price!" }]}
          >
            <InputNumber
              prefix={<MoneyCollectOutlined className="text-gray-400" />}
              placeholder="Enter price"
              min={0}
              style={{ width: "100%" }}
              // onChange={(value) => setPrice(value)}
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter quantity!" }]}
          >
            <InputNumber
              prefix={<FieldNumberOutlined className="text-gray-400" />}
              placeholder="Enter quantity"
              min={0}
              precision={0}
              style={{ width: "100%" }}
              // onChange={(value) => setQuantity(value)}
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please choose category!" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="label"
              // onChange={(value) => setCategory(value)}
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Teen", label: "Teen" },
                { value: "History", label: "History" },
                { value: "Comics", label: "Comics" },
                { value: "Business", label: "Business" },
                { value: "Music", label: "Music" },
                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "Sports", label: "Sports" },
                { value: "Travel", label: "Travel" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BookUpdateModal;

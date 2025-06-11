import { createBookAPI, handleUploadFile } from "@services/apiService";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  UserAddOutlined,
  BookOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import { openNotification } from "@libs/utils";
import { useState } from "react";
import { useBookContext } from "@context/BookProvider";

const AddNewBook = () => {
  const { isModalOpen, setIsModalOpen, fetchBooksData } = useBookContext();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [form] = Form.useForm();

  const handleCreateBook = async (values) => {
    const resUploadFile = await handleUploadFile(selectedFile, "book");
    if (resUploadFile?.data) {
      const newThumbnail = resUploadFile.data.fileUploaded;
      const res = await createBookAPI(
        newThumbnail,
        values.mainText,
        values.author,
        +values.price,
        +values.quantity,
        values.category,
      );
      if (res?.data) {
        openNotification(
          "success",
          "Create Book Success",
          "Book has been created successfully!",
        );
        resetAndCloseModal();
        fetchBooksData();
      } else {
        openNotification(
          "error",
          "Create Book Error",
          Array.isArray(res?.message) ? res.message.join("; ") : res?.message,
        );
      }
    }
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
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
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <UserAddOutlined className="text-blue-600" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Create New Book
          </span>
        </div>
      }
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={resetAndCloseModal}
      okText="Create Book"
      cancelText="Cancel"
      maskClosable={false}
      centered
      width={500}
      className="book-form-modal"
      styles={{
        body: { padding: "24px" },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateBook}
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
          label="Book Name"
          name="mainText"
          rules={[{ required: true, message: "Please enter the Book name!" }]}
        >
          <Input
            prefix={<BookOutlined className="text-gray-400" />}
            placeholder="Enter book name"
            className="rounded-lg"
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
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <InputNumber
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter price"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity!" }]}
        >
          <InputNumber
            prefix={<PhoneOutlined className="text-gray-400" />}
            placeholder="Enter quantity"
            min={0}
            precision={0}
            style={{ width: "100%" }}
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
  );
};
export default AddNewBook;

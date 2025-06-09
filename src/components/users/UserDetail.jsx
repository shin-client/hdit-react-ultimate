import {
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { handleUploadFile, updateUserAPI } from "@services/apiService";
import {
  Button,
  Drawer,
  message,
  Typography,
  Upload,
  Card,
  Avatar,
  Spin,
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const UserDetail = ({
  isUserDetailOpen,
  setIsUserDetailOpen,
  currUserData,
  fetchData,
}) => {
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
  const handleUpdateUserAvatar = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const res = await handleUploadFile(selectedFile, "avatar");
      if (res?.data) {
        const newAvatar = res.data.fileUploaded;
        const resUpdateAvatar = await updateUserAPI(
          currUserData._id,
          currUserData.fullName,
          currUserData.email,
          newAvatar,
        );

        if (resUpdateAvatar?.data) {
          message.success("Avatar updated successfully!");
          resetUploadState();
          fetchData();
        } else {
          message.error(`${resUpdateAvatar.message}`);
        }
      } else {
        message.error(`${res.message}`);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      message.error("Failed to update avatar");
    } finally {
      setUploading(false);
    }
  };
  return (
    <Drawer
      title={
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <UserOutlined className="text-lg text-blue-600" />
          </div>
          <div>
            <Title level={4} className="mb-0 text-gray-800">
              User Details
            </Title>
            <Text type="secondary" className="text-sm">
              View and manage user information
            </Text>
          </div>
        </div>
      }
      placement="right"
      onClose={() => {
        setIsUserDetailOpen(false);
        resetUploadState();
      }}
      open={isUserDetailOpen}
      width={420}
      className="user-detail-drawer"
      styles={{
        body: { padding: "16px", backgroundColor: "#fafafa" },
        header: { padding: "16px 24px" },
      }}
      breakpoint="md"
    >
      <div className="space-y-6!">
        {/* Avatar Section */}
        <Card className="border-0 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="group relative">
              <Avatar
                size={120}
                src={
                  currUserData.avatar
                    ? `${import.meta.env.VITE_API_URL}/images/avatar/${currUserData.avatar}`
                    : undefined
                }
                icon={!currUserData.avatar && <UserOutlined />}
                className="border-4 border-white shadow-lg transition-transform duration-200 group-hover:scale-105"
              />
              {uploading && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black">
                  <Spin size="large" />
                </div>
              )}
            </div>

            <div className="text-center">
              <Title level={5} className="mb-1">
                {currUserData.fullName}
              </Title>
              <Text type="secondary">{currUserData.email}</Text>
            </div>

            <div className="w-full">
              <Upload {...props} className="w-full">
                <Button
                  icon={<UploadOutlined />}
                  className="w-full rounded-lg"
                  size="large"
                >
                  Change Avatar
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
                      onClick={handleUpdateUserAvatar}
                      loading={uploading}
                      className="flex-1 rounded-lg border-0 bg-green-600 hover:bg-green-700"
                    >
                      Save Avatar
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
        {/* User Information Section */}
        <Card
          className="border-0 shadow-sm transition-shadow duration-200 hover:shadow-md"
          title={
            <div className="flex items-center space-x-2">
              <IdcardOutlined className="text-blue-600" />
              <span>Personal Information</span>
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
                  User ID
                </Text>
                <div className="truncate font-mono text-sm text-gray-800">
                  {currUserData._id}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <UserOutlined className="text-sm text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Full Name
                </Text>
                <div className="truncate font-medium text-gray-800">
                  {currUserData.fullName}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <MailOutlined className="text-sm text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Email Address
                </Text>
                <div className="truncate font-medium text-gray-800">
                  {currUserData.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <PhoneOutlined className="text-sm text-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <Text
                  type="secondary"
                  className="text-xs font-medium uppercase"
                >
                  Phone Number
                </Text>
                <div className="font-medium text-gray-800">
                  {currUserData.phone}
                </div>
              </div>
            </div>
            {currUserData.createdAt && (
              <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                  <CalendarOutlined className="text-sm text-indigo-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <Text
                    type="secondary"
                    className="text-xs font-medium uppercase"
                  >
                    Member Since
                  </Text>
                  <div className="text-sm font-medium text-gray-800">
                    {formatDate(currUserData.createdAt)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Drawer>
  );
};
export default UserDetail;

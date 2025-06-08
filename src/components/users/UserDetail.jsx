import { UploadOutlined } from "@ant-design/icons";
import { handleUploadFile, updateUserAPI } from "@services/apiService";
import { Button, Drawer, List, message, Typography, Upload } from "antd";
import { useState } from "react";

const UserDetail = ({
  isUserDetailOpen,
  setIsUserDetailOpen,
  currUserData,
  fetchData,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const resetUploadState = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const data = [
    { title: "ID", id: currUserData._id },
    { title: "Full Name", fullName: currUserData.fullName },
    { title: "Email", email: currUserData.email },
    { title: "Phone Number", phone: currUserData.phone },
    {
      title: "Avatar",
      avatar: `${import.meta.env.VITE_API_URL}/images/avatar/${currUserData.avatar}`,
    },
  ];
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
        setIsUserDetailOpen(false);
        resetUploadState();
        message.success("Upload avatar success!");
        fetchData();
      } else message.error(`${resUpdateAvatar.message}`);
    } else {
      message.error(`${res.message}`);
      return;
    }
  };

  return (
    <>
      <Drawer
        className="overflow-hidden"
        title="User Detail"
        onClose={() => {
          setIsUserDetailOpen(false);
          resetUploadState();
        }}
        open={isUserDetailOpen}
      >
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div>
                <Typography.Text className="mr-2" strong>
                  {item.title}:
                </Typography.Text>
                {item.avatar ? (
                  <div className="space-y-4">
                    <img className="max-w-[260px] rounded" src={item.avatar} />
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Upload avatar</Button>
                    </Upload>
                    {preview && (
                      <>
                        <img className="max-w-[260px] rounded" src={preview} />
                        <Button type="primary" onClick={handleUpdateUserAvatar}>
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <Typography.Text copyable>
                    {item.id || item.fullName || item.email || item.phone}
                  </Typography.Text>
                )}
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};
export default UserDetail;

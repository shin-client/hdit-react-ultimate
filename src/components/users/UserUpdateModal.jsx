import { createUserAPI } from "@/services/apiService";
import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Modal, notification, Space } from "antd";
import { useState } from "react";

const UserUpdateModal = ({ fetchData }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, desc) => {
    api[type]({
      message: message,
      description: desc,
    });
  };

  const handleUpdateUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res?.data) {
      openNotification("success", "Update user success");
      resetAndCloseModal();
      fetchData();
    } else {
      openNotification(
        "error",
        "Update user error",
        JSON.stringify(res.message),
      );
    }
  };

  const resetAndCloseModal = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Space size="middle">
        <EditOutlined
          className="cursor-pointer text-lg text-yellow-400!"
          onClick={() => setIsModalOpen(true)}
        />
        <DeleteOutlined className="cursor-pointer text-lg text-red-500!" />
      </Space>
      <Modal
        title="Update User"
        open={isModalOpen}
        onOk={() => handleUpdateUser()}
        onCancel={() => resetAndCloseModal()}
        okText={"Update"}
        maskClosable={false}
        centered
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Full name"
            prefix={<UserOutlined className="text-black/25!" />}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            placeholder="Email"
            prefix={<MailOutlined className="text-black/25!" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className="text-black/25!" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Phone number"
            prefix={<PhoneOutlined className="text-black/25!" />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default UserUpdateModal;

import { createUserAPI } from "@services/apiService";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { openNotification } from "@libs/utils";

const UserForm = ({ fetchData }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res?.data) {
      openNotification(
        "success",
        "Create user success",
        "Go to login page and login to your account",
      );
      resetAndCloseModal();
      fetchData();
    } else {
      openNotification(
        "error",
        "Create user error",
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
    <div className="mx-auto">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Table users</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create user
        </Button>
        <Modal
          title="Create User"
          open={isModalOpen}
          onOk={() => handleCreateUser()}
          onCancel={() => resetAndCloseModal()}
          okText={"Create"}
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
      </div>
    </div>
  );
};
export default UserForm;

import { createUserAPI } from "@/services/apiService";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import { useState } from "react";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, desc) => {
    api[type]({
      message: message,
      description: desc,
    });
  };

  const handleCreateUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res?.data) {
      openNotification(
        "success",
        "Create user success",
        "Go to login page and login to your account",
      );
      // setFullName("");
      // setEmail("");
      // setPassword("");
      // setPhone("");
    } else {
      openNotification(
        "error",
        "Create user error",
        JSON.stringify(res.message),
      );
    }
  };

  return (
    <div className="mx-auto flex max-w-xs flex-col gap-4">
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
      {contextHolder}
      <Button type="primary" onClick={handleCreateUser}>
        Create user
      </Button>
    </div>
  );
};
export default UserForm;

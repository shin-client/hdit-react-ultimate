import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userList, setUserList] = useState([]);

  const handleCreateUser = () => {
    setUserList([
      ...userList,
      {
        fullName: fullName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      },
    ]);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
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
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button type="primary" onClick={handleCreateUser}>
        Create user
      </Button>
    </div>
  );
};
export default UserForm;

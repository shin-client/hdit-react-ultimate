import {
  BookOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => setCurrent(e.key);

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <BookOutlined />,
    },
  ];

  return (
    <div className="mb-4 flex flex-col items-center justify-center shadow-sm">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
export default Header;

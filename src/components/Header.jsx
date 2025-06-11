import { useAuthContext } from "@context/AuthProvider";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Typography,
  Avatar,
  Drawer,
  Input,
  Button,
  Dropdown,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { logoutUserAPI } from "@services/apiService";

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo, setUserInfo, isAuthenticated, setIsAuthenticated } =
    useAuthContext();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setCurrentPage("home");
    else if (path.startsWith("/users")) setCurrentPage("users");
    else if (path.startsWith("/books")) setCurrentPage("books");
    else if (path.startsWith("/login")) setCurrentPage("login");
    else if (path.startsWith("/register")) setCurrentPage("register");
  }, [location]);

  const onClick = (e) => {
    setCurrentPage(e.key);
    if (e.key === "logout") {
      handleLogout();
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    const res = await logoutUserAPI();
    if (res.data) {
      message.success("Logout success!");
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
      setUserInfo(null);
      navigate("/login");
    }
  };

  // User dropdown menu items
  const userMenuItems = [
    {
      key: "profile",
      label: (
        <div className="px-2 py-1">
          <div className="font-semibold">{userInfo?.fullName}</div>
          <div className="text-sm text-gray-500">{userInfo?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "settings",
      label: "Account Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];
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
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo và Brand */}
              <Link
                to="/"
                className="flex items-center space-x-3 transition-opacity hover:opacity-90"
                style={{ color: "white" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <AppstoreOutlined className="text-xl" />
                </div>
                <div className="hidden sm:block">
                  <Title
                    level={4}
                    className="mb-0 font-bold"
                    style={{ color: "white" }}
                  >
                    React Ultimate
                  </Title>
                  <p className="-mt-1 text-xs">Management System</p>
                </div>
              </Link>

              {/* Desktop Navigation Menu */}
              <div className="mx-8 hidden max-w-4xl lg:flex">
                <Menu
                  onClick={onClick}
                  selectedKeys={[currentPage]}
                  mode="horizontal"
                  items={items}
                  overflowedIndicator={false}
                  className="header-menu *:mr-2!"
                  style={{
                    backgroundColor: "transparent",
                    borderBottom: "none",
                  }}
                  theme="dark"
                />
              </div>

              {/* Desktop Right Section */}
              <div className="hidden items-center space-x-4 lg:flex">
                {/* User Info hoặc Auth Buttons */}
                {isAuthenticated && userInfo ? (
                  <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                    trigger={["click"]}
                  >
                    <div className="flex cursor-pointer items-center space-x-3! rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10">
                      <Avatar
                        src={
                          userInfo.avatar
                            ? `${import.meta.env.VITE_API_URL}/images/avatar/${userInfo.avatar}`
                            : undefined
                        }
                        icon={<UsergroupAddOutlined />}
                        className="border-2 border-white/20"
                        size="default"
                      />
                      <div className="text-sm text-white">
                        <div className="font-medium">{userInfo.fullName}</div>
                        <div className="text-xs text-blue-100">
                          {userInfo.role || "User"}
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center space-x-2 lg:hidden">
                <Button
                  type="text"
                  icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="border-none text-white! hover:bg-white/10"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <AppstoreOutlined className="text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-800">React Ultimate</div>
              <div className="text-xs text-gray-500">Management System</div>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
        className="mobile-nav-drawer"
      >
        <div className="flex h-full flex-col">
          {/* User Info in Mobile */}
          {isAuthenticated && userInfo && (
            <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={
                    userInfo.avatar
                      ? `${import.meta.env.VITE_API_URL}/images/avatar/${userInfo.avatar}`
                      : undefined
                  }
                  icon={<UsergroupAddOutlined />}
                  size="large"
                  className="border-2 border-blue-200"
                />
                <div>
                  <div className="font-semibold text-gray-800">
                    {userInfo.fullName}
                  </div>
                  <div className="text-sm text-gray-500">{userInfo.email}</div>
                  <div className="text-xs text-blue-600">
                    {userInfo.role || "User"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Search */}
          <div className="mb-4">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
            />
          </div>

          {/* Mobile Menu Items */}
          <Menu
            onClick={onClick}
            selectedKeys={[currentPage]}
            mode="vertical"
            items={items}
            className="mobile-menu flex-1 border-none bg-transparent"
            style={{ backgroundColor: "transparent" }}
          />

          {/* Mobile Auth Buttons or User Actions */}
          <div className="mt-auto border-t border-gray-100 pt-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Button
                  type="text"
                  icon={<SettingOutlined />}
                  className="w-full justify-start"
                  size="large"
                >
                  Account Settings
                </Button>
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  danger
                  className="w-full justify-start"
                  size="large"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex w-full flex-col items-center gap-2">
                <Link to="/login" className="w-full">
                  <Button
                    type="default"
                    size="large"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button
                    type="primary"
                    className="w-full"
                    size="large"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Header;

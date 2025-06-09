import {
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  MenuOutlined,
  CloseOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Menu, Typography, Avatar, Drawer, Badge, Input, Button, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

const { Title } = Typography;

const Header = () => {
  const location = useLocation();
  const [current, setCurrent] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate user authentication state (in real app, get from context/store)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage or context)
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsAuthenticated(true);
      setUserInfo(JSON.parse(user));
    }
  }, []);

  // Update current menu item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrent('home');
    else if (path.startsWith('/users')) setCurrent('users');
    else if (path.startsWith('/books')) setCurrent('books');
    else if (path.startsWith('/login')) setCurrent('login');
    else if (path.startsWith('/register')) setCurrent('register');
  }, [location]);
  const onClick = (e) => {
    setCurrent(e.key);

    // Handle logout
    if (e.key === 'logout') {
      handleLogout();
    }

    // Close mobile menu after clicking
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserInfo(null);
    window.location.href = '/login';
  };

  // User dropdown menu items
  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div className="px-2 py-1">
          <div className="font-semibold">{userInfo?.fullName}</div>
          <div className="text-gray-500 text-sm">{userInfo?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      label: 'Account Settings',
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];  const items = [
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
    ...(!isAuthenticated ? [
      {
        label: <Link to={"/login"}>Login</Link>,
        key: "login",
        icon: <LoginOutlined />,
      },
      {
        label: <Link to={"/register"}>Register</Link>,
        key: "register",
        icon: <UserAddOutlined />,
      }
    ] : [])
  ];  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo và Brand */}
              <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg backdrop-blur-sm">
                  <AppstoreOutlined className="text-white text-xl" />
                </div>
                <div className="hidden sm:block">
                  <Title level={4} className="text-white mb-0 font-bold">
                    React Ultimate
                  </Title>
                  <p className="text-blue-100 text-xs -mt-1">Management System</p>
                </div>
              </Link>

              {/* Desktop Navigation Menu */}
              <div className="hidden lg:flex flex-1 max-w-4xl mx-8">
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={items}
                  overflowedIndicator={false}
                  className="border-none bg-transparent text-white header-menu flex-1"
                  style={{
                    backgroundColor: 'transparent',
                    borderBottom: 'none',
                  }}
                  theme="dark"
                />
              </div>

              {/* Desktop Right Section */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Search Bar */}
                <div className="hidden xl:block">
                  <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined className="text-gray-400" />}
                    className="w-64 rounded-full bg-white/10 border-white/20 text-white placeholder-white/60"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                </div>

                {/* Notifications */}
                {isAuthenticated && (
                  <Badge count={3} size="small">
                    <BellOutlined className="text-white text-xl hover:text-blue-200 cursor-pointer transition-colors" />
                  </Badge>
                )}

                {/* User Info hoặc Auth Buttons */}
                {isAuthenticated && userInfo ? (
                  <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                    trigger={['click']}
                  >
                    <div className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200">
                      <Avatar
                        src={userInfo.avatar ? `${import.meta.env.VITE_API_URL}/images/avatar/${userInfo.avatar}` : undefined}
                        icon={<UsergroupAddOutlined />}
                        className="border-2 border-white/20"
                        size="default"
                      />
                      <div className="text-sm text-white">
                        <div className="font-medium">{userInfo.fullName}</div>
                        <div className="text-blue-100 text-xs">{userInfo.role || 'User'}</div>
                      </div>
                    </div>
                  </Dropdown>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm border border-white/20"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center space-x-2">
                {isAuthenticated && (
                  <Badge count={3} size="small">
                    <BellOutlined className="text-white text-lg hover:text-blue-200 cursor-pointer transition-colors" />
                  </Badge>
                )}
                <Button
                  type="text"
                  icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white hover:bg-white/10 border-none"
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
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <AppstoreOutlined className="text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-800">React Ultimate</div>
              <div className="text-gray-500 text-xs">Management System</div>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
        className="mobile-nav-drawer"
      >
        <div className="flex flex-col h-full">
          {/* User Info in Mobile */}
          {isAuthenticated && userInfo && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={userInfo.avatar ? `${import.meta.env.VITE_API_URL}/images/avatar/${userInfo.avatar}` : undefined}
                  icon={<UsergroupAddOutlined />}
                  size="large"
                  className="border-2 border-blue-200"
                />
                <div>
                  <div className="font-semibold text-gray-800">{userInfo.fullName}</div>
                  <div className="text-gray-500 text-sm">{userInfo.email}</div>
                  <div className="text-blue-600 text-xs">{userInfo.role || 'User'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Search */}
          <div className="mb-4">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-lg"
            />
          </div>

          {/* Mobile Menu Items */}
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="vertical"
            items={items}
            className="border-none bg-transparent mobile-menu flex-1"
            style={{ backgroundColor: 'transparent' }}
          />

          {/* Mobile Auth Buttons or User Actions */}
          <div className="mt-auto pt-4 border-t border-gray-100">
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
              <div className="space-y-2">
                <Link to="/login">
                  <Button
                    type="default"
                    className="w-full"
                    size="large"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
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

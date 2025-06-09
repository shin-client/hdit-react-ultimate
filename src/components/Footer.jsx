import {
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
  HeartFilled,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Typography, Row, Col } from "antd";
import { Link } from "react-router";

const { Text, Title } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Row gutter={[48, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500">
                  <UserOutlined className="text-xl text-white" />
                </div>
                <div>
                  <Title level={4} className="mb-0 text-white!">
                    React Ultimate
                  </Title>
                  <Text className="text-sm text-white!">Management System</Text>
                </div>
              </div>
              <Text className="text-sm! text-gray-300!">
                A modern and comprehensive user management platform built with
                React, providing powerful tools for organizing and managing your
                data efficiently.
              </Text>

              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
                <a
                  href="https://github.com/shin-tran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10! transition-all duration-200 hover:scale-110 hover:bg-white/20!"
                >
                  <GithubOutlined className="text-white!" />
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10! transition-all duration-200 hover:scale-110 hover:bg-white/20!"
                >
                  <LinkedinOutlined className="text-white!" />
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10! transition-all duration-200 hover:scale-110 hover:bg-white/20!"
                >
                  <TwitterOutlined className="text-white!" />
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10! transition-all duration-200 hover:scale-110 hover:bg-white/20!"
                >
                  <FacebookOutlined className="text-white!" />
                </a>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <Title level={5} className="mb-0 text-white!">
                Quick Links
              </Title>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
                <Link
                  to="/users"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <UserOutlined />
                  <span>Users</span>
                </Link>
                <Link
                  to="/books"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <BookOutlined />
                  <span>Books</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <InfoCircleOutlined />
                  <span>About Us</span>
                </Link>
              </div>
            </div>
          </Col>

          {/* Support */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <Title level={5} className="mb-0 text-white!">
                Support
              </Title>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <CustomerServiceOutlined />
                  <span>Help Center</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <FileTextOutlined />
                  <span>Documentation</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <InfoCircleOutlined />
                  <span>Privacy Policy</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-300! transition-colors duration-200 hover:text-white!"
                >
                  <FileTextOutlined />
                  <span>Terms of Service</span>
                </a>
              </div>
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <Title level={5} className="mb-0 text-white!">
                Contact Us
              </Title>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MailOutlined className="text-blue-400" />
                  <span>contact@reactultimate.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <PhoneOutlined className="text-blue-400" />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-start space-x-2 text-sm text-gray-300">
                  <HomeOutlined className="mt-0.5 text-blue-400" />
                  <span className="leading-relaxed">
                    123 Tech Street, Innovation District
                    <br />
                    Ho Chi Minh City, Vietnam
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Statistics or Additional Info */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <Row gutter={[24, 16]} className="text-center">
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-400">10K+</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-sm text-gray-300">Uptime</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-400">5⭐</div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-black/20">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>© {currentYear}</span>
              <a
                href="https://github.com/shin-tran"
                className="font-medium transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                NgocDepTrai™
              </a>
              <span>All Rights Reserved.</span>
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-300">
              <span>Made with</span>
              <HeartFilled className="animate-pulse text-red-500!" />
              <span>in Vietnam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

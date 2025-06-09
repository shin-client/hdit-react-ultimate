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
  FileTextOutlined
} from "@ant-design/icons";
import { Typography, Divider, Row, Col, Space } from "antd";
import { Link } from "react-router";

const { Text, Title } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Row gutter={[48, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserOutlined className="text-white text-xl" />
                </div>
                <div>
                  <Title level={4} className="text-white mb-0">
                    React Ultimate
                  </Title>
                  <Text className="text-blue-200 text-sm">Management System</Text>
                </div>
              </div>
              <Text className="text-gray-300 text-sm leading-relaxed">
                A modern and comprehensive user management platform built with React,
                providing powerful tools for organizing and managing your data efficiently.
              </Text>

              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
                <a
                  href="https://github.com/shin-tran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <GithubOutlined className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <LinkedinOutlined className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <TwitterOutlined className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <FacebookOutlined className="text-white" />
                </a>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <Title level={5} className="text-white mb-0">
                Quick Links
              </Title>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
                <Link
                  to="/users"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  <UserOutlined />
                  <span>Users</span>
                </Link>
                <Link
                  to="/books"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  <BookOutlined />
                  <span>Books</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
              <Title level={5} className="text-white mb-0">
                Support
              </Title>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  <CustomerServiceOutlined />
                  <span>Help Center</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  <FileTextOutlined />
                  <span>Documentation</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  <InfoCircleOutlined />
                  <span>Privacy Policy</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
              <Title level={5} className="text-white mb-0">
                Contact Us
              </Title>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <MailOutlined className="text-blue-400" />
                  <span>contact@reactultimate.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <PhoneOutlined className="text-blue-400" />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-start space-x-2 text-gray-300 text-sm">
                  <HomeOutlined className="text-blue-400 mt-0.5" />
                  <span className="leading-relaxed">
                    123 Tech Street, Innovation District<br />
                    Ho Chi Minh City, Vietnam
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Statistics or Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <Row gutter={[24, 16]} className="text-center">
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-400">10K+</div>
                <div className="text-gray-300 text-sm">Active Users</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-gray-300 text-sm">Uptime</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-300 text-sm">Support</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-400">5⭐</div>
                <div className="text-gray-300 text-sm">Rating</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>© {currentYear}</span>
              <a
                href="https://github.com/shin-tran"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                NgocDepTrai™
              </a>
              <span>All Rights Reserved.</span>
            </div>

            <div className="flex items-center space-x-1 text-gray-300 text-sm">
              <span>Made with</span>
              <HeartFilled className="text-red-500 animate-pulse" />
              <span>in Vietnam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

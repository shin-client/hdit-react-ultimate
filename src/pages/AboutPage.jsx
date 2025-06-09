import { Card, Typography, Row, Col, Timeline, Tag } from "antd";
import {
  TeamOutlined,
  RocketOutlined,
  TrophyOutlined,
  HeartOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div className="bg-gray-50 px-6 pt-6 pb-6">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Title level={1} className="text-gray-800 mb-4">
            About React Ultimate
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            React Ultimate is a comprehensive management system designed to provide
            modern solutions for user and content management with a focus on
            simplicity, performance, and user experience.
          </Paragraph>
        </div>

        {/* Stats Cards */}
        <Row gutter={[24, 24]} className="mb-12">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <TeamOutlined className="text-4xl text-blue-600 mb-3" />
              <Title level={3} className="mb-1">10K+</Title>
              <Text type="secondary">Active Users</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <RocketOutlined className="text-4xl text-green-600 mb-3" />
              <Title level={3} className="mb-1">99.9%</Title>
              <Text type="secondary">Uptime</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <TrophyOutlined className="text-4xl text-yellow-600 mb-3" />
              <Title level={3} className="mb-1">5 Stars</Title>
              <Text type="secondary">User Rating</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <HeartOutlined className="text-4xl text-red-600 mb-3" />
              <Title level={3} className="mb-1">24/7</Title>
              <Text type="secondary">Support</Text>
            </Card>
          </Col>
        </Row>

        {/* Content Grid */}
        <Row gutter={[24, 24]}>
          {/* Mission */}
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 shadow-md">
              <Title level={3} className="text-blue-600 mb-4">
                Our Mission
              </Title>
              <Paragraph className="text-gray-600 leading-relaxed">
                We strive to create intuitive and powerful tools that help businesses
                manage their operations more effectively. Our platform combines modern
                technology with user-centered design to deliver exceptional experiences.
              </Paragraph>
              <div className="space-y-2 mt-4">
                <Tag color="blue">Innovation</Tag>
                <Tag color="green">Reliability</Tag>
                <Tag color="purple">User Experience</Tag>
              </div>
            </Card>
          </Col>

          {/* Features */}
          <Col xs={24} lg={12}>
            <Card className="h-full border-0 shadow-md">
              <Title level={3} className="text-green-600 mb-4">
                Key Features
              </Title>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text>Modern React Architecture</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text>Responsive Design</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text>Real-time Updates</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text>Advanced User Management</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <Text>Secure Authentication</Text>
                </div>
              </div>
            </Card>
          </Col>

          {/* Timeline */}
          <Col xs={24}>
            <Card className="border-0 shadow-md">
              <Title level={3} className="text-purple-600 mb-6">
                Development Timeline
              </Title>
              <Timeline
                items={[
                  {
                    color: 'blue',
                    children: (
                      <div>
                        <Title level={5} className="mb-1">Project Initialization</Title>
                        <Text type="secondary">Set up the foundation with React and modern tooling</Text>
                      </div>
                    ),
                  },
                  {
                    color: 'green',
                    children: (
                      <div>
                        <Title level={5} className="mb-1">User Management System</Title>
                        <Text type="secondary">Implemented comprehensive user CRUD operations</Text>
                      </div>
                    ),
                  },
                  {
                    color: 'orange',
                    children: (
                      <div>
                        <Title level={5} className="mb-1">UI/UX Enhancement</Title>
                        <Text type="secondary">Modern design system with Ant Design integration</Text>
                      </div>
                    ),
                  },
                  {
                    color: 'purple',
                    children: (
                      <div>
                        <Title level={5} className="mb-1">Advanced Features</Title>
                        <Text type="secondary">Search, filtering, and responsive design implementation</Text>
                      </div>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutPage;

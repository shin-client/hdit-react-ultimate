import { LockOutlined, MailOutlined, LoginOutlined } from "@ant-design/icons";
import { openNotification } from "@libs/utils";
import { loginUserAPI } from "@services/apiService";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    setIsLoading(true);
    const res = await loginUserAPI(values.email, values.password, 5000);
    if (res.data) {
      openNotification("success", "Login", "Login successful!");
      console.log("Success:", values);
      navigate("/");
    } else {
      openNotification("error", "Login", res.message);
    }
    setIsLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card
        className="w-full max-w-md border-0 shadow-2xl"
        style={{ borderRadius: "16px" }}
      >
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <LoginOutlined className="text-2xl text-green-600" />
          </div>
          <Title level={2} className="mb-2 text-gray-800">
            Welcome Back
          </Title>
          <Text type="secondary" className="text-base">
            Sign in to your account to continue
          </Text>
        </div>
        <Form
          name="login"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
          className="space-y-1"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              className="rounded-lg"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="rounded-lg"
            />
          </Form.Item>
          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="h-12 w-full rounded-lg border-0 bg-green-600 text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl"
              loading={isLoading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Divider className="my-6">
          <Text type="secondary" className="text-sm">
            Don't have an account?
          </Text>
        </Divider>
        <div className="text-center">
          <Button
            type="link"
            className="p-0 font-medium text-green-600 hover:text-green-700"
            onClick={() => navigate("/register")}
          >
            Create account here
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default LoginPage;

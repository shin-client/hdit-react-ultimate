import { LockOutlined, MailOutlined, LoginOutlined } from "@ant-design/icons";
import { useAuthContext } from "@context/AuthProvider";
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
  const { setUserInfo, setIsAuthenticated } = useAuthContext();

  const onFinish = async (values) => {
    setIsLoading(true);
    const res = await loginUserAPI(values.email, values.password, 5000);
    if (res.data) {
      openNotification("success", "Login", "Login successful!");
      localStorage.setItem("access_token", res.data.access_token);
      setUserInfo(res.data.user);
      setIsAuthenticated(true);
      navigate("/");
    } else openNotification("error", "Login", res.message);
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
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <LoginOutlined className="text-2xl" />
          </div>
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>
        <Form
          name="login"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
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
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={false}
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

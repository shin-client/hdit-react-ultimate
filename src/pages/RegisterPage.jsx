import { openNotification } from "@libs/utils";
import { registerUserAPI } from "@services/apiService";
import { Form, Button, Input, Card, Typography, Divider } from "antd";
import { useNavigate } from "react-router";
import {
  UserAddOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone,
    );
    if (res.data) {
      openNotification("success", "Register User", "Success!");
      console.log("Success:", values);
      navigate("/login");
    } else {
      openNotification("error", "Register User", res.message);
    }
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
            <UserAddOutlined className="text-2xl text-blue-600" />
          </div>
          <Title level={2} className="mb-2 text-gray-800">
            Create Account
          </Title>
          <Text type="secondary" className="text-base">
            Join us today! Please fill in your information
          </Text>
        </div>

        <Form
          name="register"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
          className="space-y-1"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input
              prefix={<UserAddOutlined className="text-gray-400" />}
              placeholder="Enter your full name"
              className="rounded-lg"
            />
          </Form.Item>

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

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                pattern:
                  /^(84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/,
                message: "Please enter a valid Vietnamese phone number!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-gray-400" />}
              placeholder="Enter your phone number"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="h-12 w-full rounded-lg border-0 bg-blue-600 text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider className="my-6">
          <Text type="secondary" className="text-sm">
            Already have an account?
          </Text>
        </Divider>

        <div className="text-center">
          <Button
            type="link"
            className="p-0 font-medium text-blue-600 hover:text-blue-700"
            onClick={() => navigate("/login")}
          >
            Sign in here
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default RegisterPage;

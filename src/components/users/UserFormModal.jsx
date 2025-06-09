import { createUserAPI } from "@services/apiService";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { openNotification } from "@libs/utils";

const UserFormModal = ({ fetchData, isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleCreateUser = async (values) => {
    const res = await createUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone,
    );

    if (res?.data) {
      openNotification(
        "success",
        "Create User Success",
        "User has been created successfully!",
      );
      resetAndCloseModal();
      fetchData();
    } else {
      openNotification(
        "error",
        "Create User Error",
        Array.isArray(res?.message) ? res.message.join("; ") : res?.message,
      );
    }
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <UserAddOutlined className="text-blue-600" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Create New User
          </span>
        </div>
      }
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={resetAndCloseModal}
      okText="Create User"
      cancelText="Cancel"
      maskClosable={false}
      centered
      width={500}
      className="user-form-modal"
      styles={{
        body: { padding: "24px" },
      }}
    >
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Fill in the information below to create a new user account
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateUser}
        size="large"
        className="space-y-4"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            { required: true, message: "Please enter the full name!" },
            { min: 2, message: "Full name must be at least 2 characters!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Enter full name"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter email address"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter the password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter password"
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
            placeholder="Enter phone number"
            className="rounded-lg"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UserFormModal;

import { createUserAPI } from "@/services/apiService";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";

const UserUpdateModal = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  currUserData,
  setCurrUserData,
}) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, desc) => {
    api[type]({
      message: message,
      description: desc,
    });
  };

  useEffect(() => {
    if (currUserData) {
      setId(currUserData._id);
      setFullName(currUserData.fullName);
      setPhone(currUserData.phone);
    }
  }, [currUserData]);

  const handleUpdateUser = async () => {
    const res = await createUserAPI(id, fullName, phone);
    if (res?.data) {
      openNotification("success", "Update user success");
      resetAndCloseModal();
      // fetchData();
    } else {
      openNotification(
        "error",
        "Update user error",
        JSON.stringify(res.message),
      );
    }
  };

  const resetAndCloseModal = () => {
    setId("");
    setFullName("");
    setPhone("");
    setCurrUserData("");
    setIsModalUpdateOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={() => handleUpdateUser()}
        onCancel={() => resetAndCloseModal()}
        okText={"Update"}
        maskClosable={false}
        centered
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="ID"
            prefix={<LockOutlined className="text-black/25!" />}
            value={id}
            disabled
          />
          <Input
            placeholder="Full name"
            prefix={<UserOutlined className="text-black/25!" />}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            placeholder="Phone number"
            prefix={<PhoneOutlined className="text-black/25!" />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default UserUpdateModal;

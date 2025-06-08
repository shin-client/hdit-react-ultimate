import { contextHolder, openNotification } from "@/libs/utils";
import { updateUserAPI } from "@services/apiService";
import {
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Modal } from "antd";
import { useEffect, useState } from "react";

const UserUpdateModal = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  currUserData,
  setCurrUserData,
  fetchData,
}) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (currUserData) {
      setId(currUserData._id);
      setFullName(currUserData.fullName);
      setPhone(currUserData.phone);
    }
  }, [currUserData]);

  const handleUpdateUser = async () => {
    const res = await updateUserAPI(id, fullName, phone);
    if (res?.data) {
      openNotification("success", "Update user", "Success!");
      resetAndCloseModal();
      fetchData();
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

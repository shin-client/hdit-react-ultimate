import { notification } from "antd";

const openNotification = (type, message, desc) => {
  notification[type]({
    message: message,
    description: desc,
    placement: "topRight",
    duration: 2.5,
  });
};

export { openNotification };

import { notification } from "antd";

const [api, contextHolder] = notification.useNotification();
const openNotification = (type, message, desc) => {
  api[type]({
    message: message,
    description: desc,
  });
};

export { openNotification, contextHolder };

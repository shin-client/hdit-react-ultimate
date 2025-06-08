import { Drawer, List, Typography } from "antd";

const UserDetail = ({
  isUserDetailOpen,
  setIsUserDetailOpen,
  currUserData,
}) => {
  const data = [
    { title: "ID", id: currUserData._id },
    { title: "Full Name", fullName: currUserData.fullName },
    { title: "Email", email: currUserData.email },
    { title: "Phone Number", phone: currUserData.phone },
  ];

  return (
    <>
      <Drawer
        title="User Detail"
        onClose={() => setIsUserDetailOpen(false)}
        open={isUserDetailOpen}
      >
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div>
                <Typography.Text className="mr-2" strong>
                  {item.title}:
                </Typography.Text>
                <Typography.Text copyable>
                  {item.id || item.fullName || item.email || item.phone}
                </Typography.Text>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};
export default UserDetail;

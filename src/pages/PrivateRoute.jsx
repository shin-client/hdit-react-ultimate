import { useAuthContext } from "@context/AuthProvider";
import { Button, Result } from "antd";
import { Link } from "react-router";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAuthContext();

  if (userInfo && userInfo.id) {
    return <>{children}</>;
  }
  return (
    <Result
      status="403"
      title="Unauthorize!"
      subTitle={`Bạn cần đăng nhập để có thể truy cập vào trang này!`}
      extra={
        <Link to={"/login"} className="hover:underline">
          <Button type="primary">Đến trang đăng nhập</Button>
        </Link>
      }
    />
  );
};
export default PrivateRoute;

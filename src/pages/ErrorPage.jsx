import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="mx-auto flex h-[100vh] flex-col items-center justify-center">
      <Result
        status="404"
        title="Oops!"
        subTitle={`${error.statusText || error.message}`}
        extra={
          <Link to={"/"} className="hover:underline">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};
export default ErrorPage;

import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto flex h-[100vh] flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"} className="hover:underline">
        Back to homepage
      </Link>
    </div>
  );
};
export default ErrorPage;

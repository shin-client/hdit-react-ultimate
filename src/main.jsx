import { StrictMode } from "react";
import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "@pages/ErrorPage";
import Todo from "@components/Todo";
import UsersPage from "@pages/UsersPage";
import BooksPage from "@pages/BooksPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Todo /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/books", element: <BooksPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

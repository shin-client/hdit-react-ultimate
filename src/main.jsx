import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <div>This is login page</div> },
  { path: "/register", element: <div>This is register page</div> },
  { path: "/users", element: <div>This is users page</div> },
  { path: "/products", element: <div>This is products page</div> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

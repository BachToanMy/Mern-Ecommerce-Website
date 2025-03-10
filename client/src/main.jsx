import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RooLayout from "./components/layout/RooLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RooLayout />,
    children: [{ index: true, element: <App /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

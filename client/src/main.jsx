import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RooLayout from "./components/layout/RooLayout.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import Offers from "./pages/Offers.jsx";
import Order from "./pages/Order.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./pages/Profile.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Shop from "./pages/Shop.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RooLayout />,
    children: [
      { index: true, element: <App /> },
      { path: '/about', element: <About/>},
      { path: '/cart', element:<Cart/>},
      { path: '/contact', element:<Contact/>},
      { path: '/offers', element:<Offers/>},
      { path: '/orders', element:<Order/>},
      { path: '/product',element:<Product/>},
      { path: '/profile', element:<Profile/>},
      { path: '/signin', element:<Signin/>},
      { path: '/signup', element: <Signup/>},
      { path: '/shop', element:<Shop/>},
      { path: '/product/:id',element:<SingleProduct/>},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

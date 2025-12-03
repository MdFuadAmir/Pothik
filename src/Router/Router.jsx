import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/CheckOut/CheckOut";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Statistic from "../Pages/Dashboard/Common/Statistic/Statistic";
import MyOrders from "../Pages/Dashboard/Common/MyOrders/MyOrders";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import PrivateRoutes from "../Routes/PrivateRoutes";
import ForbiddenPage from "../Components/ForbiddenPage/ForbiddenPage";
import TrackOrder from "../Pages/Dashboard/Common/TrackOrder/TrackOrder";
import ManageOrders from "../Pages/Dashboard/Seller/ManageOrders/ManageOrders";
import MyShop from "../Pages/Dashboard/Seller/MyShop/MyShop";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/product/:id",
        Component: ProductDetails,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <CheckOut />
          </PrivateRoutes>
        ),
      },
      {
        path: "/forbidden",
        element: <ForbiddenPage />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signUp",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "statistic",
        Component: Statistic,
      },
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "track-order",
        Component: TrackOrder,
      },
      {
        path: "manage-orders",
        Component: ManageOrders,
      },
      {
        path: "my-shop",
        Component: MyShop,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

export default router;

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


const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            path:"/",
            Component: Home
        },
        {
            path:"/products",
            Component: Products
        },
        {
            path:"/about",
            Component: About
        },
        {
            path:"/contact",
            Component: Contact
        },
        {
            path:"/cart",
            Component: Cart
        },
        {
            path:"/product/:id",
            Component: ProductDetails
        },
        
    ]

  },
  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path:'/login',
        Component: Login
      },
      {
        path:'/signUp',
        Component: SignUp
      },
    ]
  }
]);

export default router;

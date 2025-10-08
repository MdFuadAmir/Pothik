import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import Covrage from "../Pages/Coveage/Covrage";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import PrivateRoutes from "../Routes/PrivateRoutes";
import AddProducts from "../Pages/Dashboard/AddProducts/AddProducts";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Home from "../Pages/Home/Home/Home";
import SellerApplication from "../Pages/SellerApplication/SellerApplication";

const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            
            {
                path:'/covrage',
                Component: Covrage
            },
            {
                path:'/sellerApplication',
                Component: SellerApplication
            },
        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children:[
            {
                path:'login',
                Component: Login,
            },
            {
                path:'signUp',
                Component: SignUp
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children:[
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path:'addProduct',
                element: <AddProducts></AddProducts>
            },
        ]
    }
])
export default router;
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
import MyProducts from "../Pages/Dashboard/My-Products/MyProducts";
import RiderApplications from "../Pages/RiderApplications/RiderApplications";
import PendingRider from "../Pages/Dashboard/PendingRider/PendingRider";
import PendingSeller from "../Pages/Dashboard/PendingSeller/PendingSeller";
import Forbidden from "../Shared/Forbidden/Forbidden";
import ActiveSellers from "../Pages/Dashboard/ActiveSellers/ActiveSellers";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";

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
                path:'/forbidden',
                Component: Forbidden
            },
            {
                path:'/seller-application',
                element: <PrivateRoutes><SellerApplication></SellerApplication></PrivateRoutes>
            },
            {
                path:'/rider-application',
                element: <PrivateRoutes><RiderApplications></RiderApplications></PrivateRoutes>
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
            // admin access
            {
                path:'make-admin',
                element: <MakeAdmin></MakeAdmin>
            },
            {
                path:'pending-seller',
                element: <PendingSeller></PendingSeller>
            },
            {
                path:'active-seller',
                element: <ActiveSellers></ActiveSellers>
            },
            {
                path:'pending-rider',
                element: <PendingRider></PendingRider>
            },
            {
                path:'active-rider',
                element: <ActiveRiders></ActiveRiders>
            },
            
            // seller access
            {
                path:'addProduct',
                element: <AddProducts></AddProducts>
            },
            {
                path:'my-products',
                element: <MyProducts></MyProducts>
            },
            // rider access
            
        ]
    }
])
export default router;
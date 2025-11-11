import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Forbidden from "../Shared/Forbidden/Forbidden";
import Statistic from "../Pages/Dashboard/Common/Statistic/Statistic";
import Profile from "../Pages/Dashboard/Common/Profile/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/about-us',
                element: <AboutUs/>
            },
            {
                path:'/contact',
                element: <Contact/>
            },
            {
                path:'/forbidden',
                element: <Forbidden/>
            },

        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children:[
            {
                path:'login',
                Component: Login
            },
            {
                path:'signUp',
                Component: SignUp
            },
        ]
    },
    {
        path:'/dashboard',
        element: <DashboardLayout/>,
        children:[
            {
                index:true,
                element: <Statistic/>
            },
            {
                path:'profile',
                element: <Profile/>
            }
        ]
    }
])

export default router;
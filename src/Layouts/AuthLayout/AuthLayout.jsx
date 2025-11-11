import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";

const AuthLayout = () => {
    return (
         <div className="h-full p-4 bg-linear-to-br from-indigo-950 via-violet-800 to-indigo-950 max-w-[2520px] mx-auto px-4 md:px-10 lg:px-20">
            <div className="w-fit bg-indigo-300 rounded">
            <Pothik/>
            </div>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;
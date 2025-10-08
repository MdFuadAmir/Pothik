import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto bg-blue-950 h-full p-4">
            <Pothik></Pothik>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
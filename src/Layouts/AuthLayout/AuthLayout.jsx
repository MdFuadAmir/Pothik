import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import login from "../../assets/images.jpg";
const AuthLayout = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-[2520px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="p-6">
        <Pothik />
        </div>
      <div className=" flex justify-center items-center flex-col-reverse md:flex-row ">
        <div className="w-full md:w-1/2">
          <Outlet />
        </div>
        <div className="w-full md:w-1/2">
          <img src={login} alt="image" className="w-full h-full"/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

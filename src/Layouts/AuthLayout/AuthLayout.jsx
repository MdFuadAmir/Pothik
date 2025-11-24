import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import login from "../../assets/images.jpg";
const AuthLayout = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-[2520px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="p-6">
        <Pothik />
        </div>
      <div className=" flex justify-center flex-col md:flex-row ">
        <div className="w-full md:w-1/2">
          <Outlet />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img src={login} alt="image" className="max-w-96"/>
          <h1 className="text-xl font-bold">Pothik Web – Modern Web Solutions</h1>
          <p className="text-sm mt-6">Pothik Web is a leading web development platform dedicated to creating seamless digital experiences. Our team specializes in designing responsive and user-friendly websites tailored to your business needs. From e-commerce solutions to dynamic web applications, we ensure high performance and scalability. We combine modern technologies with creative design to bring your ideas to life. Customer satisfaction and continuous innovation are at the core of everything we do. With Pothik Web, your online presence is elevated to a professional and impactful level.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

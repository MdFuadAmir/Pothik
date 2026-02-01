import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import login from "../../assets/images.jpg";
import DarkMood from "../../Components/DarkMood/DarkMood";
import bg from "../../assets/bgimage.jpg";
import bg2 from "../../assets/bgLight.jpg";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen mx-auto px-4 md:px-10 lg:px-20">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${isDark ? bg : bg2})`,
        }}
      >
        {/* overlay */}
        {!isDark && <div className="absolute inset-0 bg-black/20" />}
      </div>
      {/* header */}
      <div className="p-6">
        <Pothik />
        <div className="hidden">
          <DarkMood />
        </div>
      </div>

      {/* content */}
      <div className="flex justify-center flex-col md:flex-row gap-8">
        {/* outlet section */}
        <div className="w-full md:w-1/2">
          <Outlet />
        </div>

        {/* right info section */}
        <div
          className="
          w-full md:w-1/2
          flex flex-col items-center justify-center
          p-6 rounded-xl
          "
        >
          <img
            src={login}
            alt="login visual"
            className="max-w-96 rounded-lg mb-6"
          />
          <div className="p-4 bg-white/10 rounded-xl">
            <h1 className="text-xl text-black dark:text-gray-200 font-semibold text-center">
              Pothik Web – Modern Web Solutions
            </h1>
            <p className="text-sm mt-4 leading-relaxed text-black dark:text-gray-400">
              Pothik Web is a leading web development platform dedicated to
              creating seamless digital experiences. Our team specializes in
              designing responsive and user-friendly websites tailored to your
              business needs. From e-commerce solutions to dynamic web
              applications, we ensure high performance and scalability. We
              combine modern technologies with creative design to bring your
              ideas to life. Customer satisfaction and continuous innovation are
              at the core of everything we do. With Pothik Web, your online
              presence is elevated to a professional and impactful level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

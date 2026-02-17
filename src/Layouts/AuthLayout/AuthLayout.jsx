import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import DarkMood from "../../Components/DarkMood/DarkMood";
import bg from "../../assets/HomeBanner/32671.jpg";
import bg2 from "../../assets/HomeBanner/32042.jpg";
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
      </div>

      {/* content */}
      <div className="flex justify-center flex-col md:flex-row gap-8">
        {/* outlet section */}
        <div className="w-full md:w-1/2">
          <Outlet />
          <div
            title="Change Background"
            className="fixed bottom-24 right-4 z-50"
          >
            <DarkMood />
          </div>
        </div>

        {/* right info section */}
        <div
          className="
          w-full md:w-1/2
          flex flex-col items-center justify-center
           rounded-xl
          "
        >
          <div className="p-4 bg-gray-900/80 rounded-xl">
            <h1 className="text-xl text-emerald-400 font-semibold text-center">
              Pothik Web – Modern Web Solutions
            </h1>
            <p className="text-sm mt-4 leading-relaxed text-gray-200">
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

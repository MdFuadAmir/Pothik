import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bg from "../../assets/bgimage.jpg";
import bg2 from "../../assets/bgLight.jpg";
import { useEffect, useState } from "react";

const RootLayout = () => {
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
    <div className="relative">
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
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] max-w-[2520px] mx-auto px-4 pt-16 md:px-10 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

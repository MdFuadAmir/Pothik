import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bg from "../../assets/HomeBanner/32671.jpg";
import bg1 from "../../assets/HomeBanner/32042.jpg";
import { useEffect, useState } from "react";
import DarkMood from "../../Components/DarkMood/DarkMood";

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
          backgroundImage: `url(${isDark ? bg : bg1})`,
        }}
      >
        {/* overlay */}
        {!isDark && <div className="absolute inset-0 bg-black/20" />}
      </div>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] max-w-650 mx-auto pt-16">
        <Outlet />

        <div title="Change Background" className="fixed bottom-24 right-4 z-50">
          <DarkMood />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

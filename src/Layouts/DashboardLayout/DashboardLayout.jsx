import { Link, Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import AdminMenu from "./DashboardMenu/AdminMenu";
import SellerMenu from "./DashboardMenu/SellerMenu";
import { FaAlignJustify, FaSignOutAlt, FaUserSecret } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import UserMenu from "./DashboardMenu/UserMenu";
import toast from "react-hot-toast";
import ApplySellerButton from "../../Pages/Dashboard/Common/ApplySellerButton/ApplySellerButton";
import DarkMood from "../../Components/DarkMood/DarkMood";
import bg from "../../assets/HomeBanner/32042.jpg";
import bg2 from "../../assets/HomeBanner/32671.jpg";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [role, roleLoading] = useRole();
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

  const closeSidebar = () => {
    const drawer = document.getElementById("my-drawer-2");
    if (drawer) drawer.checked = false;
  };

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("LogOut Successfully !"))
      .catch((error) => toast.error(error.message));
  };

  if (roleLoading) return <Loading />;

  return (
    <div className="drawer lg:drawer-open">
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
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar sticky top-0 z-50 lg:hidden ">
          <label htmlFor="my-drawer-2" className="btn btn-ghost">
            <FaAlignJustify
              size={20}
              className="text-gray-800 dark:text-gray-200"
            />
          </label>
          <span className="flex-1 text-center font-semibold text-gray-800 dark:text-gray-200">
            <Pothik />
          </span>
        </div>

        <div className="flex flex-col justify-between min-h-screen">
          <div className="p-4 md:p-8">
            <Outlet />
            <div
              title="Change Background"
              className="
    fixed bottom-24 right-4 z-50
   
  "
            >
            </div>
              <DarkMood />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu w-64 min-h-full bg-gray-500/20 dark:bg-gray-500/10 flex flex-col justify-between p-4 backdrop-blur">
          <div>
            <Pothik />
            <div className="mt-6 space-y-1">
              <DashboardMenu
                labal="My Statistic"
                to="/dashboard"
                icon={IoIosStats}
                onClick={closeSidebar}
              />

              {role === "admin" && <AdminMenu closeSidebar={closeSidebar} />}
              {role === "seller" && <SellerMenu closeSidebar={closeSidebar} />}
              <UserMenu closeSidebar={closeSidebar} />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gray-500/20 dark:bg-gray-500/10 p-4 space-y-2">
            <DashboardMenu
              labal="Profile"
              to="/dashboard/profile"
              icon={FaUserSecret}
              onClick={closeSidebar}
            />

            {role === "user" && <ApplySellerButton />}

            <li>
              <Link
                onClick={handleLogOut}
                className="flex items-center gap-2 font-semibold text-red-500"
              >
                <FaSignOutAlt /> LogOut
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

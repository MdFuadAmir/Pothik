import { NavLink, Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import AdminMenu from "./DashboardMenu/AdminMenu";
import SellerMenu from "./DashboardMenu/SellerMenu";
import { FaUserSecret } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import UserMenu from "./DashboardMenu/UserMenu";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, roleLoading] = useRole();
  const closeSidebar = () => {
    const drawer = document.getElementById("my-drawer-2");
    if (drawer) drawer.checked = false;
  };
  if (roleLoading) {
    return <Loading />;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}

        <div className="navbar bg-base-300 sticky top-0 z-50 lg:hidden">
          <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
            ☰
          </label>
          <span className="mx-2 flex-1 text-green-600 font-semibold">
            {user.displayName}
          </span>
        </div>
        <div className="bg-gray-200 min-h-screen p-4 md:p-8">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-700 min-h-full w-80 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <Pothik />
              <p className="text-white">{role}</p>
            </div>
            <div className="mt-4 space-y-2">
              <DashboardMenu
                labal={"My Statistic"}
                to={"/dashboard"}
                icon={IoIosStats}
                onClick={closeSidebar}
              />
              {role === "admin" && <AdminMenu closeSidebar={closeSidebar} />}
              {role === "seller" && <SellerMenu closeSidebar={closeSidebar} />}
              <UserMenu closeSidebar={closeSidebar} />
            </div>
          </div>
          <div className="bg-gray-600 p-4 rounded space-y-2">
            <DashboardMenu
              labal={"Profile"}
              to={"/dashboard/profile"}
              icon={FaUserSecret}
              onClick={closeSidebar}
            />
            <li>
              <NavLink className="text-red-500">
                <FiLogOut /> Log Out
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

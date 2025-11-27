import { Link, NavLink, Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 lg:hidden">
          <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
            ☰
          </label>
          <span className="mx-2 flex-1">Dashboard</span>
        </div>

        <div className="bg-gray-200 min-h-screen p-4 md:p-8">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-500 min-h-full w-80 p-4 flex flex-col justify-between">
          <div>
            <Pothik />
            <div className="mt-4 space-y-2">
              <li>
                <NavLink
                  to={"/dashboard/statistic"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-500 font-semibold bg-gray-50"
                      : "text-white font-bold"
                  }
                >
                  My Statistic
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/my-orders"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-500 font-semibold bg-gray-50"
                      : "text-white font-bold"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            </div>
          </div>
          <li>
            <Link>Profile</Link>
            <Link>Log Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

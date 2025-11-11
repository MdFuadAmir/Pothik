import { Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import MenuItems from "../../Pages/Dashboard/MenuItems/MenuItems";
import { FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const handleCloseDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen mx-auto bg-linear-to-bl from-indigo-200 via-violet-100 to-indigo-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar w-full lg:hidden bg-indigo-950 text-white">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* main content */}
        <div className="p-4 md:p-8">
          <Outlet></Outlet>
        </div>
      </div>
      {/* navbar hear start*/}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-base-content min-h-full w-80 p-4 bg-linear-to-br from-indigo-950 via-violet-900 to-indigo-950">
          <div className="">
            <Pothik></Pothik>
          <div className="border-t border-amber-500 p-4">
            <MenuItems
              to="/dashboard"
              labal="Statistics"
              icon={FaHome}
              onClick={handleCloseDrawer}
            />
          </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

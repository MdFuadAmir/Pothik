import { NavLink, Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import { FaHeart, FaHistory, FaHome, FaMapMarkedAlt, FaMoneyCheckAlt, FaMotorcycle, FaPlusSquare, FaShoppingCart, FaUserPlus } from "react-icons/fa";
const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
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
        <Outlet></Outlet>
      </div>
      {/* navbar hear start*/}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-indigo-950 text-base-content min-h-full w-80 p-4">
          <Pothik></Pothik>
          <div className="divider divider-primary -mt-2"></div>
          {/* Sidebar content here */}
          <div className=" space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-white"
                }
              >
                <FaHome className="inline mr-2" size={15} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myCart"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaShoppingCart className="inline mr-2" size={15} /> My Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/favorite"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaHeart className="inline mr-2" size={15} /> My Favorite Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/trackMyProduct"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaMapMarkedAlt className="inline mr-2" size={15} /> Track my Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/orderHistory"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaHistory className="inline mr-2" size={15} /> My Order History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaMoneyCheckAlt className="inline mr-2" size={15} /> Payment History
              </NavLink>
            </li>
            {/* seller add product nav links */}
            <li>
              <NavLink
                to="/dashboard/addProduct"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaPlusSquare className="inline mr-2" size={15} /> Add Product
              </NavLink>
            </li>
            {/* assign seller nav links */}
            <li>
              <NavLink
                to="/dashboard/assign-seller"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaUserPlus className="inline mr-2" size={15} /> Assign Sellers
              </NavLink>
            </li>
            {/*   seller pro duct list nav links */}
            <li>
              <NavLink
                to="/dashboard/my-products"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaUserPlus className="inline mr-2" size={15} /> My Products
              </NavLink>
            </li>
            {/*   rider assign pro duct list nav links */}
            <li>
              <NavLink
                to="/dashboard/assign-rider"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaMotorcycle className="inline mr-2" size={15} /> Assign Rider
              </NavLink>
            </li>
           
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

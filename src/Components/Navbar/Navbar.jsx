import { Link, NavLink } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import useAuth from "../../Hooks/useAuth";
import {
  FaAlignJustify,
  FaCartPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
import DarkMood from "../DarkMood/DarkMood";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { cart } = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("logout");
        toast.success("LogOut Successfully !");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700 dark:text-gray-200"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/products"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700 dark:text-gray-200"
            }`
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700 dark:text-gray-200"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700 dark:text-gray-200"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <DarkMood/>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 z-50 w-full navbar px-4 md:px-10 lg:px-20 mx-auto bg-gray-200 dark:bg-gray-800 transition-colors duration-500">
      {/* nav start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaAlignJustify size={20} className="dark:text-gray-200" />
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-lg dropdown-content bg-base-100 dark:bg-gray-900 rounded-box z-1 mt-3 min-w-64 p-2 shadow dark:text-gray-200"
          >
            {navLinks}
          </ul>
        </div>
        <Pothik />
      </div>

      {/* nav center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal dark:text-gray-200 px-1">{navLinks}</ul>
      </div>

      {/* nav end */}
      <div className="navbar-end">
        <div className="flex items-center gap-2 md:gap-6">
          <div>
            <Link to={"/cart"} className="flex relative">
              <FaCartPlus size={25} className="text-gray-600 dark:text-gray-200" />
              <p className="absolute mt-4 ml-4 px-[2px] py-[1px] h-[16px] w-[16px] rounded-full text-white bg-red-500 text-[10px] text-center">
                {cart?.length}
              </p>
            </Link>
          </div>
          <div>
            {user ? (
              <Link
                onClick={handleLogOut}
                className="flex items-center text-xs px-2 py-1 rounded gap-1 border border-red-500 text-red-500 hover:bg-red-200 transition-colors duration-300"
              >
                <FaSignOutAlt /> LogOut
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="flex items-center text-xs px-2 py-1 rounded gap-1 border border-green-500 text-green-500 hover:bg-green-200 dark:hover:bg-green-700 transition-colors duration-300"
              >
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
          <div className="border rounded-full">
            {user ? (
              <Link to={"/dashboard"}>
                <img
                  src={user?.photoURL}
                  alt="photo"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            ) : (
              <FaUser className="w-10 h-10 p-2 dark:text-gray-200" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

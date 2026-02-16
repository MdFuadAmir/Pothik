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
      .then(() => toast.success("LogOut Successfully !"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      {["/", "/products", "/about", "/contact"].map((path, i) => {
        const labels = ["Home", "Products", "About", "Contact"];
        return (
          <li key={i}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "bg-sky-500 text-white shadow"
                    : "text-white hover:border-sky-400 hover:border-b"
                }
              `
              }
            >
              {labels[i]}
            </NavLink>
          </li>
        );
      })}
      <li>
        <DarkMood />
      </li>
    </>
  );

  return (
    <div
      className="
        fixed top-0 left-0 z-50 w-full
        backdrop-blur bg-gray-950/50 dark:bg-gray-950/50
        transition-all duration-500
      "
    >
      <div className="navbar px-4 md:px-10 lg:px-20 mx-auto">
        {/* nav start */}
        <div className="navbar-start gap-2">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="lg:hidden p-2 rounded-lg"
            >
              <FaAlignJustify size={20} className="text-white" />
            </div>

            <ul
              tabIndex="-1"
              className="
                menu dropdown-content mt-3 p-3 w-64
                rounded-2xl shadow-lg
                bg-gray-900 dark:bg-gray-900
                dark:text-gray-200 space-y-3
              "
            >
              {navLinks}
            </ul>
          </div>
          <Pothik />
        </div>

        {/* nav center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
        </div>

        {/* nav end */}
        <div className="navbar-end">
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to={"/cart"}
              className="relative p-2 rounded-full hover:scale-105 duration-200"
            >
              <FaCartPlus
                size={22}
                className="text-white"
              />
              <span
                className="
                absolute -top-1 -right-1
                h-5 min-w-[20px] px-1
                rounded-full bg-red-500 text-white
                text-[11px] flex items-center justify-center
              "
              >
                {cart.length}
              </span>
            </Link>

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={handleLogOut}
                className="
                  flex items-center gap-1
                  px-3 py-1.5 text-xs rounded-full
                  border border-red-500 text-red-500
                  hover:bg-red-500 hover:text-white
                  transition
                "
              >
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="
                  flex items-center gap-1
                  px-3 py-1.5 text-xs rounded-full
                  bg-sky-500 text-white
                  hover:bg-sky-600 transition
                "
              >
                <FaSignInAlt /> Login
              </Link>
            )}

            {/* User */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
              {user ? (
                <Link to={"/dashboard"}>
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </Link>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaUser className="dark:text-gray-200" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

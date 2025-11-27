import { Link, NavLink } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import useAuth from "../../Hooks/useAuth";
import { FaCartPlus, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
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
            `pb-1 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700"
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
            `pb-1 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700"
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
            `pb-1 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700"
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
            `pb-1 border-b-2 transition-all duration-300 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-700"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar px-4 md:px-10 lg:px-20 mx-auto bg-gray-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Pothik />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-2 md:gap-6">
          <div>
            <Link to={"/cart"} className="flex relative">
              <FaCartPlus size={25} className="text-gray-600" />
              <p className="absolute mt-4 ml-4 px-[2px] py-[1px] h-[16px] w-[16px] rounded-full  text-white bg-red-500 text-[10px] text-center">
                {cart?.length}
              </p>
            </Link>
          </div>
          <div>
            {user ? (
              <Link
                onClick={handleLogOut}
                className="flex items-center text-xs px-2 py-1 rounded gap-1 border border-red-300 text-red-500"
              >
                <FaSignOutAlt /> LogOut
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="flex items-center text-xs px-2 py-1 rounded gap-1 border border-green-500 text-green-500"
              >
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
          <div className="border rounded-full">
            {user ? (
              <Link to={'/dashboard'}>
              <img
                src={user?.photoURL}
                alt="photo"
                className="w-10 h-10 rounded-full"
              />
              </Link>
            ) : (
              <FaUser className="w-10 h-10 p-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Link, NavLink } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import Pothik from "../../Shared/Pothik/Pothik";
const Navbar = () => {
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
    <div className="navbar md:px-10 lg:px-20 mx-auto bg-teal-100">
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
        <div className="flex items-center gap-6">
          <div>
            <Link to={'/login'} className="btn btn-outline border-2 border-green-500">
              Login
            </Link>
          </div>
          <div>profile</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { NavLink, Outlet } from "react-router";
import Pothik from "../../Shared/Pothik/Pothik";
import {
  FaHeart,
  FaHistory,
  FaHome,
  FaMapMarkedAlt,
  FaMoneyCheckAlt,
  FaMotorcycle,
  FaPlusSquare,
  FaShoppingCart,
  FaStore,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Shared/Loading/Loading";
const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  // close drawer when clicking link
  const handleCloseDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };
  if (roleLoading) {
    return <Loading></Loading>;
  }
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
          <div className="flex justify-between items-center">
            <Pothik></Pothik>
            <h2 className="text-emerald-500 px-2 py-1 bg-indigo-800 rounded shadow-2xl">
              {role}
            </h2>
          </div>
          <div className="divider divider-primary -mt-2"></div>
          {/* Sidebar content here */}
          <div className=" space-y-2">
            {/* dashbord for all */}
            <li>
              <NavLink
                to="/dashboard"
                onClick={handleCloseDrawer}
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-white"
                }
              >
                <FaHome className="inline mr-2" size={15} /> Home
              </NavLink>
            </li>
            {/* Admin actions start*/}
            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/make-admin"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaUserShield className="inline mr-2" size={15} /> Make
                    Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/pending-seller"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaUserPlus className="inline mr-2" size={15} /> Pending
                    Sellers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/active-seller"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaStore className="inline mr-2" size={15} /> Active Sellers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/pending-rider"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaMotorcycle className="inline mr-2" size={15} /> Pending
                    Rider
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/active-rider"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <GiDeliveryDrone className="inline mr-2" size={15} /> Active
                    Riders
                  </NavLink>
                </li>
              </>
            )}
            {/* admin actions end */}
            {/* seller actions staart */}
            {!roleLoading && role === "seller" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addProduct"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaPlusSquare className="inline mr-2" size={15} /> Add
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-products"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaUserPlus className="inline mr-2" size={15} /> My Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/seller-assign-rider"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-white"
                    }
                  >
                    <FaUserPlus className="inline mr-2" size={15} /> Assign
                    Rider
                  </NavLink>
                </li>
              </>
            )}
            {/* seller actions end */}
            {/* rider actions start*/}
            <li>
              <NavLink
                to="/dashboard/assign-orders"
                onClick={handleCloseDrawer}
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaUserPlus className="inline mr-2" size={15} />
                My Assign Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/delevery-history"
                onClick={handleCloseDrawer}
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaUserPlus className="inline mr-2" size={15} />
                Delevery history
              </NavLink>
            </li>
            {/* rider actions end*/}
            {/* user actions start */}
            {role === "admin" ? (
              <div className="divider divider-accent"></div>
            ) : role === "seller" ? (
              <div className="divider divider-primary"></div>
            ) : role === "rider" ? (
              <div className="divider divider-primary"></div>
            ) : (
              ""
            )}
            <li>
              <NavLink
                to="/dashboard/myCart"
                onClick={handleCloseDrawer}
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
                onClick={handleCloseDrawer}
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaHeart className="inline mr-2" size={15} /> My Favorite
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/tracking"
                onClick={handleCloseDrawer}
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaMapMarkedAlt className="inline mr-2" size={15} /> Track my
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/orderHistory"
                onClick={handleCloseDrawer}
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
                onClick={handleCloseDrawer}
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-white"
                }
              >
                <FaMoneyCheckAlt className="inline mr-2" size={15} /> Payment
                History
              </NavLink>
            </li>
            {/* user actions end */}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

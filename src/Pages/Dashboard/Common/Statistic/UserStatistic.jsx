import { FaBox, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";

const UserDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back,{" "}
            <span className="font-bold text-amber-500">
              {user?.displayName}
            </span>
          </p>
        </div>

        {/* Short profile card */}
        <div className="flex items-center gap-4 bg-indigo-950 p-3 rounded-lg shadow">
          <img
            src={user?.photoURL}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 object-cover"
          />
          <div className="text-left">
            <div className="font-semibold text-amber-500">
              {user?.displayName || "No name"}
            </div>
            <div className="text-xs text-gray-400">{user?.email}</div>
            <div className="text-xs text-green-500 capitalize">{role}</div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-500 rounded-md">
            <FaBox />
          </div>
          <div>
            <div className="text-sm">Total Orders</div>
            <div className="text-2xl font-bold">12</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            <FaCheckCircle />
          </div>
          <div>
            <div className="text-sm">Delivered</div>
            <div className="text-2xl font-bold">12</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-700 rounded-md">
            <FaClock />
          </div>
          <div>
            <div className="text-sm">Pending</div>
            <div className="text-2xl font-bold">12</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            <FaTimesCircle />
          </div>
          <div>
            <div className="text-sm">Cancelled</div>
            <div className="text-2xl font-bold">12</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import {
  FaBell,
  FaBox,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";

const recentNotifications = [
  {
    _id: "NTF001",
    title: "Order Delivered",
    message:
      "Your order TRK-1001 has been successfully delivered. Thanks for shopping!",
    createdAt: "2025-10-10T12:15:00Z",
  },
  {
    _id: "NTF002",
    title: "Rider Assigned",
    message:
      "Rider Hasan Ali has been assigned to your parcel TRK-1005. Expected delivery tomorrow.",
    createdAt: "2025-10-17T12:45:00Z",
  },
  {
    _id: "NTF003",
    title: "Order Confirmed",
    message: "Your order TRK-1003 has been confirmed by the seller.",
    createdAt: "2025-10-15T09:30:00Z",
  },
  {
    _id: "NTF004",
    title: "Parcel Picked Up",
    message: "Your parcel TRK-1002 is on the way with rider Sufian Rahman.",
    createdAt: "2025-10-16T14:50:00Z",
  },
  {
    _id: "NTF005",
    title: "Order Cancelled",
    message:
      "Your order TRK-1004 has been cancelled. Refund will be processed soon.",
    createdAt: "2025-10-16T19:10:00Z",
  },
];

const recentOrders = [
  {
    _id: "ORD001",
    trackingId: "TRK-1001",
    items: [
      { name: "Wireless Bluetooth Headphones" },
      { name: "USB-C Charging Cable" },
    ],
    totalAmount: 1850,
    status: "Delivered",
    createdAt: "2025-10-10T10:45:00Z",
  },
  {
    _id: "ORD002",
    trackingId: "TRK-1002",
    items: [{ name: "Smart Fitness Band" }],
    totalAmount: 1250,
    status: "Pending",
    createdAt: "2025-10-12T14:30:00Z",
  },
  {
    _id: "ORD003",
    trackingId: "TRK-1003",
    items: [{ name: "Laptop Backpack" }, { name: "Mouse Pad" }],
    totalAmount: 2200,
    status: "Delivered",
    createdAt: "2025-10-15T09:10:00Z",
  },
  {
    _id: "ORD004",
    trackingId: "TRK-1004",
    items: [{ name: "Gaming Mouse" }],
    totalAmount: 950,
    status: "Cancelled",
    createdAt: "2025-10-16T18:45:00Z",
  },
  {
    _id: "ORD005",
    trackingId: "TRK-1005",
    items: [{ name: "Wireless Keyboard" }],
    totalAmount: 1600,
    status: "Pending",
    createdAt: "2025-10-17T11:20:00Z",
  },
];

const UserDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  return (
    <div className="space-y-6 p-4 bg-indigo-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back,{" "}
            <span className=" font-bold text-amber-500">
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
            <div className="text-xs text-green-500 capitalize">
              {role}
            </div>
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
            <div className="text-sm ">Total Orders</div>
            <div className="text-2xl font-bold">12</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            <FaCheckCircle />
          </div>
          <div>
            <div className="text-sm">Delivered</div>
            <div className="text-2xl font-bold ">8</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-700 rounded-md">
            <FaClock />
          </div>
          <div>
            <div className="text-sm ">Pending</div>
            <div className="text-2xl font-bold">2</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            <FaTimesCircle />
          </div>
          <div>
            <div className="text-sm ">Cancelled</div>
            <div className="text-2xl font-bold">1</div>
          </div>
        </div>
      </div>

      {/* Recent orders & notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent 5 Orders */}
        <div className="rounded-lg shadow p-4 bg-indigo-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h3>
            <span className="text-sm text-gray-500">Last 5</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="py-2 px-3">Order ID</th>
                  <th className="py-2 px-3">Items</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 px-3 text-center text-gray-500"
                    >
                      No recent orders
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-0 hover:bg-indigo-200"
                    >
                      <td className="py-3 px-3 font-mono text-sm">
                        {order.trackingId || order._id}
                      </td>
                      <td className="py-3 px-3 text-sm">
                        {Array.isArray(order.items) ? (
                          order.items.slice(0, 2).map((it, idx) => (
                            <div key={idx} className="text-gray-700">
                              {it.name || it}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-700">—</div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-sm">
                        ৳{order.totalAmount || "0"}
                      </td>
                      <td className="py-3 px-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-sm text-gray-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-indigo-100 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Notifications
            </h3>
            <span className="text-sm text-gray-500">
              <FaBell />
            </span>
          </div>

          <div className="space-y-3">
            {recentNotifications.length === 0 ? (
              <div className="text-gray-500">No notifications yet</div>
            ) : (
              recentNotifications.map((n) => (
                <div
                  key={n._id}
                  className="flex gap-3 items-start border-b pb-3"
                >
                  <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FaUser />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-800">
                        {n.title || "Notification"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {n.createdAt
                          ? new Date(n.createdAt).toLocaleString()
                          : ""}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {n.message}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

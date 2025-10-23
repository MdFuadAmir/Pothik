import { FaBox, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Dynamic summary counts
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "Pending"
  ).length;
  const cancelledOrders = orders.filter(
    (o) => o.orderStatus === "Cancelled"
  ).length;

  const handleOrderCancel = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to cancel this order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/orders/cancel/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("!", "Your order has been cancelled.", "success");
          queryClient.invalidateQueries(["orders", user?.email]);
          queryClient.invalidateQueries(["sellerOrders"]); 
          queryClient.invalidateQueries(["notifications", user?.email]);
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to cancel the order.", "error");
      }
    }
  });
};
  return (
    <div className="space-y-6 p-4 bg-indigo-200 h-full">
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
            <div className="text-2xl font-bold">{totalOrders}</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            <FaCheckCircle />
          </div>
          <div>
            <div className="text-sm">Delivered</div>
            <div className="text-2xl font-bold">{deliveredOrders}</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-700 rounded-md">
            <FaClock />
          </div>
          <div>
            <div className="text-sm">Pending</div>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            <FaTimesCircle />
          </div>
          <div>
            <div className="text-sm">Cancelled</div>
            <div className="text-2xl font-bold">{cancelledOrders}</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="">
        <div className="rounded-lg shadow p-4 bg-indigo-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="py-2 px-3">Tracking ID</th>
                  <th className="py-2 px-3">Items</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td className="py-4 px-3 text-center text-gray-500">
                      No recent orders
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const grandTotal = order.items.reduce(
                      (sum, item) =>
                        sum + (item.total || item.price * (item.quantity || 1)),
                      0
                    );
                    return (
                      <tr
                        key={order._id}
                        className="border-b last:border-0 hover:bg-indigo-200"
                      >
                        <td className="py-3 px-3 font-mono text-sm">
                          {order.trackingId}
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
                        <td className="py-3 px-3 text-sm">৳{grandTotal}</td>
                        <td className="py-3 px-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              order.orderStatus === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.orderStatus === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-500">
                          {order.date
                            ? new Date(order.date).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <button
                            onClick={() => handleOrderCancel(order._id)}
                            className="btn btn-sm bg-red-500 text-white"
                          >
                            <FaTimesCircle />
                            Cancel
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

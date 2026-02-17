import { FaClock, FaShoppingBag, FaTimesCircle, FaTruck } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";
const UserStatistic = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ["order-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/stats/${user?.email}`);
      return res.data;
    },
  });
  const { data: recentOrders = [], isLoading: loading } = useQuery({
    queryKey: ["recent-orders", user?.email],
    queryFn: async () => {
      const respons = await axiosSecure.get(`/orders/recent/${user?.email}`);
      return respons.data;
    },
  });

  if (isLoading) {
    return <CompoLoading />;
  }
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-emerald-400">
            My Dashboard
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl">
            hare is your dashboard. this page you can see your total
            orders,total delivered,total pending and total cancelled orders
            status and recent orders
          </p>
        </div>
        <div className="flex gap-4 items-center bg-gray-900/80 p-4 text-white rounded shadow-xl">
          <div className="border-r pr-4">
            <img
              src={user?.photoURL}
              alt="/photo"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-md">{user.displayName}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-gray-900/80 text-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Total Orders</h2>
            <FaShoppingBag className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{statData?.total}</p>
        </div>

        {/* Delivered */}
        <div className="bg-gray-900/80 text-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Delivered</h2>
            <FaTruck className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{statData?.delivered}</p>
        </div>

        {/* Pending */}
        <div className="bg-gray-900/80 text-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Pending</h2>
            <FaClock className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{statData?.pending}</p>
        </div>

        {/* Cancelled */}
        <div className="bg-gray-900/80 text-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Cancelled</h2>
            <FaTimesCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold mt-3">{statData?.cancelled}</p>
        </div>
      </div>
      {/* recent orders and claender */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 bg-gray-900/80 rounded p-4 ">
          <h2 className="text-lg font-bold mb-3 text-white">
            Recent Orders (Last 7 Days)
          </h2>
          {loading ? (
            <span className="loading loading-ring loading-xl"></span>
          ) : recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 mt-6 flex items-center justify-center">
              <FaTimesCircle className="text-red-500 mr-1" /> No recent orders
              found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="p-2 text-left">Tracking ID</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Order Date</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="text-gray-300">
                      <td className="p-2">{order?.trackingId}</td>
                      <td className="p-2">${order?.grandTotal}</td>
                      <td className="p-2">
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2 capitalize">{order?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStatistic;

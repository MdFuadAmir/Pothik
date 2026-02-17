import {
  FaShoppingCart,
  FaBox,
  FaDollarSign,
  FaStar,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";

const SellerStatistic = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/seller/stat/${user.email}`)).data,
  });

  if (isLoading) return <CompoLoading />;
  if (error) return <p className="text-red-500">Failed to load data</p>;

  // ✅ SAFE destructuring
  const {
    totalProducts = 0,
    ordersReceived = 0,
    totalEarnings = 0,
    ordersPending = 0,
    ordersDelivered = 0,
    recentProducts = [],
    recentOrders = [],
    totalRatings = 0,
    avgRating = 0,
  } = data || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">
            Seller Dashboard
          </h1>
          <p className="text-gray-300 mt-1">
            Manage your products, track sales, and monitor your shop
            performance.
          </p>
        </div>
        <div className="flex items-center gap-2 p-4 rounded bg-gray-900/80 shadow-xl">
          <div>
            <img
              src={user.photoURL}
              alt="/photo"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="pl-2 border-l text-white space-y-1">
            <p className="font-bold ">{user.displayName}</p>
            <p className="text-gray-400 text-xs">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FaBox}
          title={"My Products"}
          value={totalProducts}
          bgColor={"bg-blue-100"}
          textColor={"text-blue-600"}
        />
        <StatCard
          icon={FaShoppingCart}
          title={"Orders Received"}
          value={ordersReceived}
          bgColor={"bg-green-100"}
          textColor={"text-green-600"}
        />
        <StatCard
          icon={FaClock}
          title={"Orders Pending"}
          value={ordersPending}
          bgColor={"bg-orange-100"}
          textColor={"text-orange-600"}
        />

        <StatCard
          icon={FaCheckCircle}
          title={"Orders Delevered"}
          value={ordersDelivered}
          bgColor={"bg-green-100"}
          textColor={"text-green-600"}
        />

        <StatCard
          icon={FaDollarSign}
          title={"Total Earnings"}
          value={totalEarnings}
          bgColor={"bg-yellow-100"}
          textColor={"text-yellow-600"}
        />
        <StatCard
          icon={FaStar}
          title={"Total Rating"}
          value={totalRatings}
          bgColor={"bg-purple-100"}
          textColor={"text-purple-600"}
        />
        <StatCard
          icon={FaStar}
          title={"Avg. Rating"}
          value={avgRating}
          bgColor={"bg-purple-100"}
          textColor={"text-purple-600"}
        />
      </div>
      {/* Recent Orders */}
      <div className="bg-gray-900/80  rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4 text-white">
          Recent Customer Orders
        </h3>

        {recentOrders.length === 0 ? (
          <p className="text-gray-300">No orders yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th>#</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {recentOrders.map((o, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{o.buyerEmail}</td>
                  <td>{o.productName}</td>
                  <td>{o.status}</td>
                  <td>{new Date(o.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Recent Products */}
      <div className="bg-gray-900/80 rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4 text-white">
          Recently Added Products
        </h3>

        {recentProducts.length === 0 ? (
          <p className="text-gray-300 ">No products yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {recentProducts.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>৳ {p.price}</td>
                  <td>{p.stock}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerStatistic;

const StatCard = ({ icon: Icon, title, value, bgColor, textColor }) => {
  return (
    <div className="bg-gray-900/80  rounded-xl shadow p-5 flex gap-4">
      <div className={`p-4 ${bgColor} ${textColor} text-3xl rounded-xl`}>
        {Icon && <Icon />}
      </div>
      <div>
        <h3 className="text-gray-200 text-sm">{title}</h3>
        <h2 className="text-xl font-bold text-white">{value}</h2>
      </div>
    </div>
  );
};

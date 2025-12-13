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
import Loading from "../../../../Components/Loading/Loading";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import BarChart from "../BarChart/BarChart";

const SellerStatistic = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/seller/stat/${user.email}`)).data,
  });

  if (isLoading) return <Loading />;
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
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your products, track sales, and monitor your shop
            performance.
          </p>
        </div>
        <div className="flex items-center gap-2 p-4 rounded bg-gray-100 shadow-xl">
          <div>
            <img src={user.photoURL} alt="/photo" className="w-12 h-12 rounded-full"/>
          </div>
          <div className="pl-2 border-l space-y-1">
            <p className="font-bold">{user.displayName}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 text-3xl rounded-xl">
            <FaBox />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">My Products</h3>
            <h2 className="text-xl font-bold">{totalProducts}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-green-100 text-green-600 text-3xl rounded-xl">
            <FaShoppingCart />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Orders Received</h3>
            <h2 className="text-xl font-bold">{ordersReceived}</h2>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 text-3xl rounded-xl">
            <FaClock />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Orders Pending</h3>
            <h2 className="text-xl font-bold">{ordersPending}</h2>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-green-100 text-green-600 text-3xl rounded-xl">
            <FaCheckCircle />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Orders Delevered</h3>
            <h2 className="text-xl font-bold">{ordersDelivered}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-yellow-100 text-yellow-600 text-3xl rounded-xl">
            <FaDollarSign />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Earnings</h3>
            <h2 className="text-xl font-bold">৳ {totalEarnings}</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-purple-100 text-purple-600 text-3xl rounded-xl">
            <FaStar />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Rating</h3>
            <h2 className="text-xl font-bold">{totalRatings}</h2>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <div className="p-4 bg-purple-100 text-purple-600 text-3xl rounded-xl">
            <FaStar />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Avg. Rating</h3>
            <h2 className="text-xl font-bold">{avgRating}</h2>
          </div>
        </div>
      </div>
      {/* chart and calender */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
        {/* chart */}
        <div className="col-span-2 flex justify-between flex-col bg-white p-4 rounded">
          <BarChart data={data} />
        </div>
        {/* calender */}
        <div className="col-span-1 rounded">
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="rounded"
          />
        </div>
      </div>
      {/* chart and calender end*/}

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4">Recent Customer Orders</h3>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
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
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4">Recently Added Products</h3>

        {recentProducts.length === 0 ? (
          <p className="text-gray-500">No products yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
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

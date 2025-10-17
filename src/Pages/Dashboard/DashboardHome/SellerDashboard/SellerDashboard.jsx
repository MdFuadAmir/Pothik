
import { FaBox, FaClock, FaCheckCircle, FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../../Hooks/useAuth";

const overview = [
  {
    title: "Total Products",
    value: 400,
    icon: <FaBoxOpen className="text-indigo-600 text-2xl" />,
    color: "bg-indigo-100",
  },
  {
    title: "Total Parcels",
    value: 400,
    icon: <FaBox className="text-indigo-600 text-2xl" />,
    color: "bg-indigo-100",
  },
  {
    title: "Pending Deliveries",
    value: 32,
    icon: <FaClock className="text-yellow-600 text-2xl" />,
    color: "bg-yellow-100",
  },
  {
    title: "Completed Deliveries",
    value: 190,
    icon: <FaCheckCircle className="text-green-600 text-2xl" />,
    color: "bg-green-100",
  },
  {
    title: "Total Earnings",
    value: "৳52,430",
    icon: <FaMoneyBillWave className="text-emerald-600 text-2xl" />,
    color: "bg-emerald-100",
  },
];

const recentOrders = [
  {
    id: "PCL-1123",
    customer: "Rahim Uddin",
    amount: "৳320",
    status: "Delivered",
    date: "2025-10-15",
  },
  {
    id: "PCL-1124",
    customer: "Amina Akter",
    amount: "৳250",
    status: "Pending",
    date: "2025-10-16",
  },
  {
    id: "PCL-1125",
    customer: "Sabbir Khan",
    amount: "৳500",
    status: "Delivered",
    date: "2025-10-14",
  },
  {
    id: "PCL-1126",
    customer: "Rina Begum",
    amount: "৳400",
    status: "Cancelled",
    date: "2025-10-13",
  },
];

const deliveryData = [
  { month: "Jan", deliveries: 30 },
  { month: "Feb", deliveries: 40 },
  { month: "Mar", deliveries: 35 },
  { month: "Apr", deliveries: 50 },
  { month: "May", deliveries: 60 },
  { month: "Jun", deliveries: 55 },
  { month: "Jul", deliveries: 65 },
  { month: "Aug", deliveries: 70 },
  { month: "Sep", deliveries: 90 },
  { month: "Oct", deliveries: 400 },
  { month: "Nov", deliveries: 300 },
  { month: "Dec", deliveries: 500 },
];

const SellerDashboard = () => {
    const {user} = useAuth();
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        <span className="text-indigo-700">{user.displayName}</span> Dashboard 
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {overview.map((card, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl shadow-sm border hover:shadow-md transition flex items-center gap-4 ${card.color}`}
          >
            <div className="p-3 bg-white rounded-full shadow">{card.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{card.title}</p>
              <h3 className="text-xl font-semibold">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-50 border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3">Monthly Deliveries</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="deliveries"
                stroke="#6366f1"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Parcel ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2 font-medium">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                  <td className="px-4 py-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

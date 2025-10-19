
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
import useUserRole from "../../../../Hooks/useUserRole";

const overview = [
  {
    title: "Total Products",
    value: 400,
    icon: <FaBoxOpen className="text-indigo-600 text-2xl" />,
  },
  {
    title: "Total Parcels",
    value: 400,
    icon: <FaBox className="text-indigo-600 text-2xl" />,
  },
  {
    title: "Pending Deliveries",
    value: 32,
    icon: <FaClock className="text-yellow-600 text-2xl" />,
  },
  {
    title: "Completed Deliveries",
    value: 190,
    icon: <FaCheckCircle className="text-green-600 text-2xl" />,
  },
  {
    title: "Total Earnings",
    value: "৳52,430",
    icon: <FaMoneyBillWave className="text-emerald-600 text-2xl" />,
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
    const {role} = useUserRole();
  return (
    <div className="p-4 bg-indigo-200 space-y-8 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {overview.map((card, i) => (
          <div
            key={i}
            className="p-5 rounded-xl shadow-sm border hover:shadow-md transition flex items-center gap-4 bg-indigo-950"
          >
            <div className="p-3 bg-indigo-900 rounded-full shadow">{card.icon}</div>
            <div>
              <p className="text-gray-300 text-sm">{card.title}</p>
              <h3 className="text-xl font-semibold text-white">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-indigo-950 text-white border rounded-xl p-5">
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
    </div>
  );
};

export default SellerDashboard;

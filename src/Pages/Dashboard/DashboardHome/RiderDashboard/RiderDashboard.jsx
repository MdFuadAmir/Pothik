import {
  FaMotorcycle,
  FaCheckCircle,
  FaClock,
  FaMoneyBill,
} from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";
const RiderDashboard = () => {
  const { user } = useAuth();
  const { role} = useUserRole();
  const overview = [
    {
      title: "Total Deliveries",
      value: 120,
      icon: <FaMotorcycle className="text-blue-600 text-2xl" />,
    },
    {
      title: "Pending Deliveries",
      value: 18,
      icon: <FaClock className="text-yellow-600 text-2xl" />,
    },
    {
      title: "Completed Deliveries",
      value: 100,
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,

    },
    {
      title: "Earnings",
      value: "৳45,300",
      icon: <FaMoneyBill className="text-emerald-600 text-2xl" />,
    },
  ];
  return (
    <div className="p-6 space-y-8 bg-indigo-200 h-full">
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

    {/* overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {overview.map((card, i) => (
          <div
            key={i}
            className="bg-indigo-950 text-white p-5 rounded-xl shadow-sm flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-900 rounded-full shadow">{card.icon}</div>
            <div>
              <p className="text-gray-300">{card.title}</p>
              <h3 className="text-xl font-semibold">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
        {/* py chart todo */}
      <div className="bg-indigo-950 border rounded-xl p-5 h-64 flex items-center justify-center text-gray-400">
        Weekly Delivery Chart (UI Placeholder)
      </div>
        {/*  */}
      <div className="overflow-x-auto bg-indigo-950 text-base-100">
        <table className="table-auto w-full text-sm border">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-2">Parcel ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, i) => (
              <tr key={i} className="border-b hover:bg-indigo-900">
                <td className="px-4 py-2">PCL-210{i}</td>
                <td className="px-4 py-2">Customer {i + 1}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Delivered
                  </span>
                </td>
                <td className="px-4 py-2">৳{i * 120 + 200}</td>
                <td className="px-4 py-2">2025-10-{12 - i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderDashboard;

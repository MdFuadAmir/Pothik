import { FaMotorcycle, FaCheckCircle, FaClock, FaMoneyBill } from "react-icons/fa";
const RiderDashboard = () => {
    const overview = [
    { title: "Total Deliveries", value: 120, icon: <FaMotorcycle className="text-blue-600 text-2xl" />, color: "bg-blue-100" },
    { title: "Pending Deliveries", value: 18, icon: <FaClock className="text-yellow-600 text-2xl" />, color: "bg-yellow-100" },
    { title: "Completed Deliveries", value: 100, icon: <FaCheckCircle className="text-green-600 text-2xl" />, color: "bg-green-100" },
    { title: "Earnings", value: "৳45,300", icon: <FaMoneyBill className="text-emerald-600 text-2xl" />, color: "bg-emerald-100" },
  ];
    return (
         <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Rider Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {overview.map((card, i) => (
          <div key={i} className={`p-5 rounded-xl shadow-sm flex items-center gap-4 ${card.color}`}>
            <div className="p-3 bg-white rounded-full shadow">{card.icon}</div>
            <div>
              <p className="text-gray-600">{card.title}</p>
              <h3 className="text-xl font-semibold">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border rounded-xl p-5 h-64 flex items-center justify-center text-gray-400">
        Weekly Delivery Chart (UI Placeholder)
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border">
          <thead className="bg-gray-100">
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
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">PCL-210{i}</td>
                <td className="px-4 py-2">Customer {i+1}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Delivered
                  </span>
                </td>
                <td className="px-4 py-2">৳{i*120 + 200}</td>
                <td className="px-4 py-2">2025-10-{12-i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default RiderDashboard;
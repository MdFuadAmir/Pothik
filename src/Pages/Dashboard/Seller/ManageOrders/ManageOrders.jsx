import {
  FaSearch,
  FaEye,
  FaTrashAlt,
  FaCheckCircle,
  FaClock,
  FaTruck,
} from "react-icons/fa";

const ManageOrders = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Manage Orders</h2>

        <div className="flex mt-4 md:mt-0 gap-2">
          <input
            type="text"
            placeholder="Search Orders..."
            className="border px-4 py-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg border rounded-lg bg-white">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* Row 1 */}
            <OrderRow
              id="ORD-10234"
              name="Mahfuz Rahman"
              amount="1450"
              status="pending"
            />

            {/* Row 2 */}
            <OrderRow
              id="ORD-10287"
              name="Sadik Mia"
              amount="980"
              status="shipped"
            />

            {/* Row 3 */}
            <OrderRow
              id="ORD-10321"
              name="Tanvir Hasan"
              amount="2230"
              status="delivered"
            />

          </tbody>
        </table>
      </div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const color =
    status === "pending"
      ? "bg-yellow-100 text-yellow-600"
      : status === "shipped"
      ? "bg-blue-100 text-blue-600"
      : "bg-green-100 text-green-600";

  const icon =
    status === "pending" ? (
      <FaClock />
    ) : status === "shipped" ? (
      <FaTruck />
    ) : (
      <FaCheckCircle />
    );

  const text =
    status === "pending"
      ? "Pending"
      : status === "shipped"
      ? "Shipped"
      : "Delivered";

  return (
    <span
      className={`px-3 py-1 flex items-center gap-2 rounded-full text-sm font-medium ${color}`}
    >
      {icon} {text}
    </span>
  );
};

// A Single Order Row
const OrderRow = ({ id, name, amount, status }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-4 font-medium">{id}</td>
      <td className="p-4">{name}</td>
      <td className="p-4 font-semibold text-gray-700">৳ {amount}</td>
      <td className="p-4">
        <StatusBadge status={status} />
      </td>

      {/* Actions */}
      <td className="p-4 flex items-center justify-center gap-4 text-lg">
        <button className="text-blue-600 hover:text-blue-800">
          <FaEye />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default ManageOrders;

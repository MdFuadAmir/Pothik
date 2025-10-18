import React, { useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaSearch,
} from "react-icons/fa";

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: "ORD-1001",
      date: "2025-10-12",
      items: 3,
      amount: 2850,
      status: "Delivered",
      payment: "Paid",
      trackingId: "TRK-458769",
    },
    {
      id: "ORD-1002",
      date: "2025-10-14",
      items: 1,
      amount: 1200,
      status: "Pending",
      payment: "Unpaid",
      trackingId: "TRK-458799",
    },
    {
      id: "ORD-1003",
      date: "2025-10-15",
      items: 2,
      amount: 1750,
      status: "On the Way",
      payment: "Paid",
      trackingId: "TRK-458805",
    },
    {
      id: "ORD-1004",
      date: "2025-10-10",
      items: 2,
      amount: 2100,
      status: "Cancelled",
      payment: "Refunded",
      trackingId: "TRK-458700",
    },
  ]);

  // optional modal for details (just concept)
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "On the Way":
        return "text-blue-600 bg-blue-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 bg-indigo-200 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
        <FaBox /> Order History
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Track your previous orders, see delivery updates, and manage your
        history.
      </p>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Order ID or Tracking ID..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-300"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left text-white">
          <thead className="bg-indigo-900 text-sm uppercase text-gray-300">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Tracking</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-indigo-800 hover:bg-indigo-900 transition-all"
              >
                <td className="p-4 font-semibold">{order.id}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.items}</td>
                <td className="p-4">৳{order.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.payment}</td>
                <td className="p-4">{order.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-indigo-900">
              Order Details - {selectedOrder.id}
            </h3>
            <p>
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Payment:</strong> {selectedOrder.payment}
            </p>
            <p>
              <strong>Tracking ID:</strong> {selectedOrder.trackingId}
            </p>
            <p>
              <strong>Total Amount:</strong> ৳{selectedOrder.amount}
            </p>
            <button className="mt-4 bg-indigo-900 text-white w-full py-2 rounded-lg hover:bg-indigo-800">
              View Full Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

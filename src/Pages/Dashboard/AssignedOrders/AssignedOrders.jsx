import React, { useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";


// 🧾 Fake data (replace with Tanstack Query later)
const initialOrders = [
  {
    id: "PCL-101",
    customer: "John Doe",
    status: "Pending",
    amount: 1200,
    date: "2025-10-10",
  },
  {
    id: "PCL-102",
    customer: "Jane Smith",
    status: "Accepted",
    amount: 850,
    date: "2025-10-11",
  },
  {
    id: "PCL-103",
    customer: "Mike Johnson",
    status: "Pending",
    amount: 2300,
    date: "2025-10-12",
  },
  {
    id: "PCL-104",
    customer: "Alice Brown",
    status: "Rejected",
    amount: 900,
    date: "2025-10-12",
  },
];

const AssignedOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Handle Accept
  const handleAccept = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Accepted" } : order
      )
    );
  };

  // Handle Reject
  const handleReject = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Rejected" } : order
      )
    );
  };

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-indigo-200 h-full">
      <SectionTitle
        sectionTitle="Assigned Orders"
        sectionSubTitle="Here are the parcels assigned to you."
      />

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered w-48"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-indigo-950 text-white rounded-xl shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Amount (৳)</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-700 hover:bg-indigo-900 transition"
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-right">{order.amount.toLocaleString()}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  {order.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(order.id)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm flex items-center gap-1"
                      >
                        <FaCheck /> Accept
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm flex items-center gap-1"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}
                  {(order.status === "Accepted" || order.status === "Rejected") && (
                    <span className="text-gray-300 text-sm">--</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-300">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedOrders;

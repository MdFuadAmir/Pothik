import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";


// 🧾 Fake data (replace later with API / Tanstack Query)
const initialDeliveries = [
  {
    id: "PCL-101",
    customer: "John Doe",
    status: "Delivered",
    amount: 1200,
    date: "2025-10-10",
  },
  {
    id: "PCL-102",
    customer: "Jane Smith",
    status: "Cancelled",
    amount: 850,
    date: "2025-10-11",
  },
  {
    id: "PCL-103",
    customer: "Mike Johnson",
    status: "Failed",
    amount: 2300,
    date: "2025-10-12",
  },
  {
    id: "PCL-104",
    customer: "Alice Brown",
    status: "Delivered",
    amount: 900,
    date: "2025-10-12",
  },
];

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [dateFilter, setDateFilter] = useState("");

  // Filtered deliveries based on date
  const filteredDeliveries = deliveries.filter((d) =>
    dateFilter ? d.date === dateFilter : true
  );

  return (
    <div className="p-6 bg-indigo-200 min-h-screen">
      <SectionTitle
        sectionTitle="Delivery History"
        sectionSubTitle="Track your past deliveries and earnings."
      />

      {/* Date Filter */}
      <div className="mb-6 flex items-center gap-3">
        <FaCalendarAlt className="text-gray-600 text-xl" />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="input input-bordered w-48"
        />
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-950 text-white p-4 rounded-xl text-center shadow-md">
          <p className="text-gray-300 text-sm">Total Delivered</p>
          <h3 className="text-2xl font-bold text-green-400">
            {deliveries.filter((d) => d.status === "Delivered").length}
          </h3>
        </div>
        <div className="bg-indigo-950 text-white p-4 rounded-xl text-center shadow-md">
          <p className="text-gray-300 text-sm">Cancelled / Failed</p>
          <h3 className="text-2xl font-bold text-red-400">
            {deliveries.filter((d) => d.status !== "Delivered").length}
          </h3>
        </div>
        <div className="bg-indigo-950 text-white p-4 rounded-xl text-center shadow-md">
          <p className="text-gray-300 text-sm">Total Earnings</p>
          <h3 className="text-2xl font-bold text-emerald-400">
            ৳
            {deliveries
              .filter((d) => d.status === "Delivered")
              .reduce((acc, d) => acc + d.amount, 0)
              .toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="overflow-x-auto bg-indigo-950 text-white rounded-xl shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3 text-left">Parcel ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Earnings (৳)</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((d) => (
              <tr
                key={d.id}
                className="border-b border-gray-700 hover:bg-indigo-900 transition"
              >
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.customer}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      d.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="p-3 text-right font-semibold">
                  {d.status === "Delivered" ? d.amount.toLocaleString() : "-"}
                </td>
                <td className="p-3">{d.date}</td>
              </tr>
            ))}
            {filteredDeliveries.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-300">
                  No deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryHistory;

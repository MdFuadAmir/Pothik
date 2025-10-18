
import { FaMoneyBillWave, FaRegClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentHistory = () => {
  // 🧾 Fake payment data (replace later with Tanstack Query)
  const payments = [
    {
      id: "p001",
      date: "2025-10-05",
      method: "bKash",
      transactionId: "TXN98451236",
      amount: 1850,
      status: "Success",
      orderId: "ORD-1204",
    },
    {
      id: "p002",
      date: "2025-09-28",
      method: "Nagad",
      transactionId: "TXN78563125",
      amount: 1250,
      status: "Pending",
      orderId: "ORD-1182",
    },
    {
      id: "p003",
      date: "2025-09-20",
      method: "Card (Visa)",
      transactionId: "TXN45987612",
      amount: 2200,
      status: "Failed",
      orderId: "ORD-1155",
    },
    {
      id: "p004",
      date: "2025-09-15",
      method: "Rocket",
      transactionId: "TXN74312678",
      amount: 990,
      status: "Success",
      orderId: "ORD-1129",
    },
  ];

  // 🎨 Status Color Handler
  const getStatusStyle = (status) => {
    switch (status) {
      case "Success":
        return "text-green-500 bg-green-100";
      case "Pending":
        return "text-yellow-500 bg-yellow-100";
      case "Failed":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <FaCheckCircle className="text-green-500" />;
      case "Pending":
        return <FaRegClock className="text-yellow-500" />;
      case "Failed":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaRegClock className="text-gray-400" />;
    }
  };

  return (
    <div className="p-6 bg-indigo-200 h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 flex gap-2 items-center mb-2">
        <FaMoneyBillWave /> Payment History
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        View your past transactions and payment details securely.
      </p>

      {/* 📊 Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-indigo-950 rounded-xl p-4 text-center shadow-md border border-indigo-800">
          <h3 className="text-gray-300 text-sm">Total Payments</h3>
          <p className="text-2xl font-bold text-green-400">
            ৳{payments.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-indigo-950 rounded-xl p-4 text-center shadow-md border border-indigo-800">
          <h3 className="text-gray-300 text-sm">Successful</h3>
          <p className="text-2xl font-bold text-green-500">
            {
              payments.filter((p) => p.status === "Success").length
            }{" "}
            Payments
          </p>
        </div>

        <div className="bg-indigo-950 rounded-xl p-4 text-center shadow-md border border-indigo-800">
          <h3 className="text-gray-300 text-sm">Pending / Failed</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {
              payments.filter((p) => p.status !== "Success").length
            }{" "}
            Payments
          </p>
        </div>
      </div>
{/* details table */}
      <div className="bg-indigo-950 text-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-900 text-gray-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-right">Amount (৳)</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <tr
                key={p.id}
                className="hover:bg-indigo-800 transition duration-200 border-b border-gray-700"
              >
                <td className="p-3 text-gray-300">{index + 1}</td>
                <td className="p-3">{p.date}</td>
                <td className="p-3">{p.orderId}</td>
                <td className="p-3">{p.method}</td>
                <td className="p-3 text-sm">{p.transactionId}</td>
                <td className="p-3 text-right font-semibold text-green-400">
                  {p.amount.toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto ${getStatusStyle(
                      p.status
                    )}`}
                  >
                    {getStatusIcon(p.status)} {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

    </div>
  );
};

export default PaymentHistory;


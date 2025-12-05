import {
  FaSearch,
  FaCheckCircle,
  FaShippingFast,
  FaBoxOpen,
  FaTruck,
  FaHome,
} from "react-icons/fa";

const TrackOrder = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Track Your Order
      </h2>

      {/* Search Box */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID..."
          className="w-full border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
          <FaSearch /> Search
        </button>
      </div>

      {/* Order Info Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <p className="mb-1">
          <strong>Order ID:</strong> ORD-912348
        </p>
        <p className="mb-1">
          <strong>Tracking ID:</strong> TRK-983475
        </p>
        <p className="mb-1">
          <strong>Status:</strong>{" "}
          <span className="text-green-600 font-semibold">Shipped</span>
        </p>
        <p>
          <strong>Order Date:</strong> 02 Dec 2025
        </p>

        {/* Progress Section */}
        <h3 className="text-lg font-semibold mt-6 mb-4">Order Progress</h3>

        <div className="relative border-l-4 border-blue-600 ml-3 pl-6 flex flex-col gap-8">
          <Step icon={<FaCheckCircle />} label="Order Placed" active />
          <Step icon={<FaBoxOpen />} label="Processing" active />
          <Step icon={<FaShippingFast />} label="Shipped" active />
          <Step icon={<FaTruck />} label="Out for Delivery" />
          <Step icon={<FaHome />} label="Delivered" />
        </div>
      </div>
    </div>
  );
};

const Step = ({ label, icon, active }) => {
  return (
    <div className="flex items-start gap-3">
      <div className={`text-2xl ${active ? "text-blue-600" : "text-gray-400"}`}>
        {icon}
      </div>
      <p
        className={`text-base ${
          active ? "text-blue-700 font-semibold" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default TrackOrder;

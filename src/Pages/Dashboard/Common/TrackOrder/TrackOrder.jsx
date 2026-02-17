import { useState } from "react";
import useAxios from "../../../../Hooks/useAxios";
import {
  FaClock,
  FaCog,
  FaTruck,
  FaMotorcycle,
  FaCheckCircle,
  FaTimesCircle,
  FaRoute,
} from "react-icons/fa";

const TrackOrder = () => {
  const axiosInstance = useAxios();
  const [trackId, setTrackId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      setOrder(null);
      const { data } = await axiosInstance.get(`/orders/track/${trackId}`);
      setOrder(data);
    } catch (err) {
      setOrder(null);
      setError("❌ Tracking ID not found!", err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 rounded-lg bg-gray-900/80">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-emerald-400">
          Track Your Order
        </h1>
        <p className="text-sm text-gray-300">
          Enter your order tracking id and see your order status
        </p>
      </div>
      {/* Search Bar */}
      <div className="flex gap-2 my-6">
        <input
          type="text"
          placeholder="Enter Tracking ID (e.g. TRK-18A8XKT2)"
          className="input w-full bg-gray-700 placeholder-gray-300 text-white shadow"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
        />
        <button
          className="px-3 py-1 flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600  text-white"
          onClick={handleSearch}
        >
          <FaRoute /> Track
        </button>
      </div>
      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
      )}
      {/*  */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2 text-emerald-400">
          Order Status
        </h2>
        <div className="mb-6 space-y-1">
          <p className="text-gray-300">
            <b>Tracking ID:</b> {order?.trackingId}
          </p>
          <p className="text-gray-300">
            <b>Payment Status:</b> {order?.paymentStatus}
          </p>
          {/* status */}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pending */}
            <div
              className={`flex items-center gap-4 border rounded p-4
    ${
      order?.status === "pending"
        ? "border-emerald-400 bg-emerald-500/10"
        : "border-gray-200"
    }`}
            >
              <FaClock
                size={28}
                className={
                  order?.status === "pending"
                    ? "text-emerald-400"
                    : "text-gray-300"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "pending"
                      ? "text-emerald-400"
                      : "text-gray-300 "
                  }`}
                >
                  Pending
                </h2>
                <p className="text-xs text-gray-500">
                  Order received & waiting for confirmation.
                </p>
              </div>
            </div>
            {/* Processing */}
            <div
              className={`flex items-center gap-4 border rounded p-4
    ${
      order?.status === "processing"
        ? "border-emerald-400 bg-emerald-500/10"
        : "border-gray-200"
    }`}
            >
              <FaCog
                size={28}
                className={
                  order?.status === "processing"
                    ? "text-emerald-400"
                    : "text-gray-500"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "processing"
                      ? "text-emerald-400"
                      : "text-gray-500 "
                  }`}
                >
                  Processing
                </h2>
                <p className="text-xs text-gray-500">
                  Your order is being prepared.
                </p>
              </div>
            </div>

            {/* Shipped */}
            <div
              className={`flex items-center gap-4 border rounded p-4
    ${
      order?.status === "shipped"
        ? "border-emerald-400 bg-emerald-500/10"
        : "border-gray-200"
    }`}
            >
              <FaTruck
                size={28}
                className={
                  order?.status === "shipped"
                    ? "text-blue-600"
                    : "text-gray-300"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "shipped"
                      ? "text-emerald-400"
                      : "text-gray-300 "
                  }`}
                >
                  Shipped
                </h2>
                <p className="text-xs text-gray-500">
                  Your parcel is on the way.
                </p>
              </div>
            </div>

            {/* In Transit */}
            <div
              className={`flex items-center gap-4 border rounded p-4
    ${
      order?.status === "in_transit"
        ? "border-emerald-400 bg-emerald-500/10"
        : "border-gray-200"
    }`}
            >
              <FaRoute
                size={28}
                className={
                  order?.status === "in_transit"
                    ? "text-blue-600"
                    : "text-gray-300"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "in_transit"
                      ? "text-emerald-400"
                      : "text-gray-300 "
                  }`}
                >
                  In Transit
                </h2>
                <p className="text-xs text-gray-500">
                  Your parcel is moving to next station.
                </p>
              </div>
            </div>

            {/* Out for delivery */}
            <div
              className={`flex items-center gap-4 border rounded p-4
    ${
      order?.status === "out_for_delivery"
        ? "border-emerald-400 bg-emerald-500/10"
        : "border-gray-200"
    }`}
            >
              <FaMotorcycle
                size={28}
                className={
                  order?.status === "out_for_delivery"
                    ? "text-blue-600"
                    : "text-gray-300"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "out_for_delivery"
                      ? "text-emerald-400"
                      : "text-gray-300"
                  }`}
                >
                  Out for delivery
                </h2>
                <p className="text-xs text-gray-500">
                  Delivery rider is on the way.
                </p>
              </div>
            </div>

            {/* Delivered */}
            <div
              className={`flex items-center gap-4 border rounded p-4
    ${
      order?.status === "delivered"
        ? "border-emerald-400 bg-emerald-500/10"
        : "border-gray-200"
    }`}
            >
              <FaCheckCircle
                size={28}
                className={
                  order?.status === "delivered"
                    ? "text-emerald-400"
                    : "text-gray-300"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "delivered"
                      ? "text-emerald-400"
                      : "text-gray-300 "
                  }`}
                >
                  Delivered
                </h2>
                <p className="text-xs text-gray-500">
                  Your order has been delivered.
                </p>
              </div>
            </div>

            {/* Cancelled */}
            <div
              className={`flex items-center gap-4 border rounded p-4
                ${
                  order?.status === "cancelled"
                    ? "border-red-600 bg-red-500/20"
                    : "border-gray-200"
                }`}
            >
              <FaTimesCircle
                size={28}
                className={
                  order?.status === "cancelled"
                    ? "text-red-600"
                    : "text-gray-300"
                }
              />
              <div>
                <h2
                  className={`font-bold ${
                    order?.status === "cancelled"
                      ? "text-red-700"
                      : "text-gray-300"
                  }`}
                >
                  Cancelled
                </h2>
                <p className="text-xs text-gray-500">
                  Your order was cancelled.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* user info and amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white">
          <div>
            <h3 className="font-semibold mb-2 text-emerald-400">
              Customer Info
            </h3>
            <div className="pl-4 space-y-1 text-gray-300">
              <p>
                <b>Name:</b>{" "}
                {order?.userInfo?.fullName
                  ? order?.userInfo?.fullName
                  : "____!"}
              </p>
              <p>
                <b>Phone:</b>{" "}
                {order?.userInfo?.phone ? order?.userInfo?.phone : "____!"}
              </p>
              <p>
                <b>Address:</b>{" "}
                {order?.userInfo?.fullAddress
                  ? order?.userInfo?.fullAddress
                  : "____!"}
              </p>
            </div>
          </div>
          {/*  */}
          <div>
            <h3 className="font-semibold mb-2 text-emerald-400">
              Order Amount
            </h3>
            <div className="pl-4 space-y-1 text-gray-300">
              <p>
                <b>Subtotal:</b> {order?.subTotal ? order?.subTotal : 0}$
              </p>
              <p>
                <b>Shipping:</b> {order?.shipping ? order?.shipping : 0}$
              </p>
              <p>
                <b>Total:</b> {order?.grandTotal ? order?.grandTotal : 0}$
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

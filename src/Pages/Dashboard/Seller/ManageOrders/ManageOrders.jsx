import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const statusFlow = [
  "pending",
  "processing",
  "shipped",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedItem, setSelectedItem] = useState(null);

  const queryClient = useQueryClient();

  const getNextStatus = (currentStatus) => {
    const index = statusFlow.indexOf(currentStatus);
    if (index === -1 || index === statusFlow.length - 1) return currentStatus;
    return statusFlow[index + 1];
  };
  const getPaymentStatus = (order) => {
    if (order.paymentMethod !== "CASH_ON_DELIVERY") {
      return "paid";
    }

    // COD হলে:
    return order.status === "delivered" ? "paid" : "pending";
  };

  const handleStatusUpdate = async (orderId, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);

    try {
      await axiosSecure.patch(`/order/status/${orderId}`, {
        status: nextStatus,
      });

      toast.success(`Status changed to: ${nextStatus}`);

      queryClient.invalidateQueries(["seller-orders", user.email]);
    } catch (error) {
      toast.error("Failed to update status", error.message);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["seller-orders", user.email],
    queryFn: async () =>
      (await axiosSecure.get(`/seller/orders/${user.email}`)).data.orders,
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold">Manage Orders</h2>
      <p className="text-gray-600 mb-4">
        Here you can see which customers ordered your products.
      </p>

      <div className="overflow-x-auto border rounded p-4">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.filter((order) => order.status !== "delivered").map((order) =>
              order.items.map((item) => (
                <tr key={item._id}>
                  <td>{order._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-3 items-center">
                    {/* view */}
                    <button
                      onClick={() => setSelectedItem({ order, item })}
                      className="btn btn-sm bg-green-100 border border-green-500"
                    >
                      <FaEye className="text-green-500" />
                    </button>
                    {/* accept */}
                    <button
                      onClick={() => {
                        if (
                          order.status !== "delivered" &&
                          order.status !== "cancelled"
                        ) {
                          handleStatusUpdate(order._id, order.status);
                        }
                      }}
                      className={`btn btn-sm ${
                        order.status === "delivered"
                          ? "bg-green-200 border border-green-600"
                          : order.status === "cancelled"
                          ? "bg-red-200 border border-red-600"
                          : "bg-blue-100 border border-blue-500"
                      }`}
                    >
                      {order.status}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedItem && (
          <div className="fixed inset-0 bg-amber-50 bg-opacity-500 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-lg relative overflow-y-auto max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold mb-4">Order Details</h2>

              {/* Order Info */}
              <div className="space-y-2 text-sm">
                <p>
                  <b>Order ID:</b> {selectedItem.order._id}
                </p>
                <p>
                  <b>Tracking ID:</b> {selectedItem.order.trackingId}
                </p>
                <p>
                  <b>Status:</b> {selectedItem.order.status}
                </p>
                <p>
                  <b>Payment Method:</b> {selectedItem.order.paymentMethod}
                </p>
                <p>
                  <b>Payment Status:</b>{" "}
                  <span
                    className={
                      getPaymentStatus(selectedItem.order) === "paid"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {getPaymentStatus(selectedItem.order)}
                  </span>
                </p>
                <p>
                  <b>Order Date:</b>{" "}
                  {new Date(selectedItem.order.createdAt).toLocaleString()}
                </p>
              </div>

              <hr className="my-4" />

              {/* Buyer Info */}
              <h3 className="font-semibold mb-2 text-lg">Buyer Information</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <b>Name:</b> {selectedItem.order.buyerInfo?.fullName}
                </p>
                <p>
                  <b>Email:</b> {selectedItem.order.buyerInfo?.email}
                </p>
                <p>
                  <b>Phone:</b> {selectedItem.order.buyerInfo?.phone}
                </p>
                <p>
                  <b>Address:</b> {selectedItem.order.buyerInfo?.fullAddress}
                </p>
                <p>
                  <b>City:</b> {selectedItem.order.buyerInfo?.city}
                </p>
                <p>
                  <b>Zip Code:</b> {selectedItem.order.buyerInfo?.zipCode}
                </p>
              </div>

              <hr className="my-4" />

              {/* Product Item Info */}
              <h3 className="font-semibold mb-2 text-lg">Product Details</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <b>Product:</b> {selectedItem.item.productName}
                </p>
                <p>
                  <b>Quantity:</b> {selectedItem.item.quantity}
                </p>
                <p>
                  <b>price:</b> {selectedItem.item.price * selectedItem.item.quantity}
                </p>
              </div>

              <hr className="my-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;

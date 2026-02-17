import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import ReviewModal from "../ReviewModal/ReviewModal";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [reviewData, setReviewData] = useState(null);

  const {
    data: orderData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data.orders;
    },
  });

  const cancelOrder = useMutation({
    mutationFn: async (orderId) => {
      const res = await axiosSecure.patch(`/orders/cancel/${orderId}`);
      return res.data;
    },
    onSuccess: (_, orderId) => {
      toast.success("Order cancel Successfully!");

      // Remove from UI instantly
      queryClient.setQueryData(["orders", user?.email], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((order) => order._id !== orderId);
      });
    },
  });

  if (orderData.length <= 0) {
    return (
      <>
        <p className="text-gray-300 text-lg mt-4">No orders found</p>
        <p className="text-gray-300 text-sm">
          Place your first order to see it here.
        </p>
      </>
    );
  }

  const openReviewModal = (orderId, item) => {
    setReviewData({
      orderId,
      productId: item.productId,
      title: item.title,
    });
  };

  if (isLoading || loading) return <CompoLoading />;
  if (error) return <p className="text-gray-300">Error loading orders</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-emerald-400">
          Orders by {user?.displayName}
        </h2>
        <p className="text-sm text-gray-200">
          this is your order history and recent order list
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderData.map((order) => (
          <div
            key={order._id}
            className="rounded-xl p-5 shadow-sm bg-gray-900/80 space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300 dark:text-gray-300">
                <span className="font-semibold ">Order ID:</span> {order._id}
              </p>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items List */}
            <div className="bg-gray-500/20 p-3 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-gray-300 dark:text-gray-300">
                Items:
              </p>

              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center gap-3 border-b pb-2"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-300">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  {order.status === "delivered" && (
                    <button
                      onClick={() => openReviewModal(order._id, item)}
                      className="text-xs px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Review
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Order Info */}
            <div className="text-sm space-y-1 pt-1 text-gray-300">
              <p>
                <span className="font-semibold">Total:</span> $
                {order.grandTotal}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment Status:</span>{" "}
                {order.paymentStatus}
              </p>
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {order.trackingId}
              </p>
            </div>

            {/* Action */}
            {order.status === "delivered" ? (
              ""
            ) : (
              <button
                onClick={() => cancelOrder.mutate(order._id)}
                className="px-2 py-1 rounded bg-red-500 text-white w-full"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
      {reviewData && (
        <ReviewModal
          reviewData={reviewData}
          closeModal={() => setReviewData(null)}
        />
      )}
    </div>
  );
};

export default MyOrders;

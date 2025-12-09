import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

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
        <p className="text-gray-500 text-lg mt-4">No orders found</p>
        <p className="text-gray-400 text-sm">
          Place your first order to see it here.
        </p>
      </>
    );
  }

  if (isLoading || loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Orders by {user?.displayName}</h2>
        <p className="text-sm text-gray-500">
          this is your order history and recent order list
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orderData.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-5 shadow-sm bg-white space-y-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Order ID:</span> {order._id}
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
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-gray-700">Items:</p>

              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Info */}
            <div className="text-sm space-y-1 pt-1">
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
            <button
              onClick={() => cancelOrder.mutate(order._id)}
              className="btn btn-sm bg-red-500 text-white w-full"
            >
              Cancel Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

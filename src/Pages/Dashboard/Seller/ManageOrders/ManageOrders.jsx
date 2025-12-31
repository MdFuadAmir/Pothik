import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";

const statusFlow = [
  "pending",
  "processing",
  "shipped",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const getNextStatus = (current) => {
  const idx = statusFlow.indexOf(current);
  if (idx === -1 || idx === statusFlow.length - 1) return current;
  return statusFlow[idx + 1];
};

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: orders = [], isLoading ,refetch } = useQuery({
    queryKey: ["seller-orders", user?.email],
    queryFn: async () =>
      (await axiosSecure.get(`/seller/orders/${user.email}`)).data.orders,
    enabled: !!user?.email,
    staleTime: 1000 * 30, // 30s
  });

  const handleItemStatusUpdate = async (orderId, itemId, currentStatus) => {
    const next = getNextStatus(currentStatus);
    if (next === currentStatus) return;

    try {
      await axiosSecure.patch(`/order/item-status/${orderId}/${itemId}`, {
        status: next,
      });

      toast.success(`Item status updated to ${next}`);
      // keep UI fresh
      queryClient.invalidateQueries(["seller-orders", user.email]);
      queryClient.invalidateQueries(["seller-delivered-orders", user.email]);
    } catch (err) {
      toast.error("Failed to update item status",err.message);
    }
  };
  refetch();

  if (isLoading) return <CompoLoading />;

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-white">Manage Orders</h2>
      <p className="text-gray-600 mb-4">
        Here you can see which customers ordered your products.
      </p>

      <div className="overflow-x-auto border dark:bg-gray-800 rounded p-4">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 dark:text-white">
              <th>Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Item Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((order) =>
              order.items.filter(
      (item) => item.status !== "delivered" && item.status !== "cancelled"
    ).map((item) => (
                <tr key={item._id} className="dark:text-gray-300">
                  <td className="whitespace-nowrap">{order._id}</td>
                  <td className="max-w-xs">{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : item.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedItem({ order, item })}
                      className="btn btn-sm bg-green-100 border border-green-500"
                    >
                      <FaEye className="text-green-500" />
                    </button>

                    <button
                      onClick={() =>
                        handleItemStatusUpdate(order._id, item._id, item.status)
                      }
                      disabled={
                        item.status === "delivered" ||
                        item.status === "cancelled"
                      }
                      className={`btn btn-sm ${
                        item.status === "delivered"
                          ? "bg-green-200 border-green-600"
                          : item.status === "cancelled"
                          ? "bg-red-200 border-red-600"
                          : "bg-blue-100 border-blue-500"
                      }`}
                    >
                      {getNextStatus(item.status)}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* modal */}
        {selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-lg relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold mb-4">Order Details</h2>

              <div className="space-y-2 text-sm">
                <p>
                  <b>Order ID:</b> {selectedItem.order._id}
                </p>
                <p>
                  <b>Tracking ID:</b> {selectedItem.order.trackingId}
                </p>
                <p>
                  <b>Payment Methode:</b> {selectedItem.order.paymentMethod}
                </p>
                <p>
                  <b>Payment Status:</b> {selectedItem.order.paymentStatus}
                </p>
                <hr />
                <p className="text-lg font-bold pl-4">Buyer info</p>
                <p>
                  <b>Name:</b> {selectedItem.order.buyerInfo.fullName}
                </p>
                <p>
                  <b>Email:</b> {selectedItem.order.buyerInfo.email}
                </p>
                <p>
                  <b>Phone:</b> {selectedItem.order.buyerInfo.phone}
                </p>
                <p>
                  <b>City:</b> {selectedItem.order.buyerInfo.city}
                </p>
                <p>
                  <b>Zip Code:</b> {selectedItem.order.buyerInfo.zipCode}
                </p>
                <p>
                  <b>Full Address:</b> {selectedItem.order.buyerInfo.fullAddress}
                </p>

                <hr />
                <p className="text-lg font-bold pl-4">Product Details</p>
                <p>
                  <b>Product Name:</b> {selectedItem.item.productName}
                </p>
                <p>
                  <b>Quantity:</b> {selectedItem.item.quantity}
                </p>
                <p>
                  <b>Total Price:</b>{" "}
                  {selectedItem.item.price * selectedItem.item.quantity}$
                </p>
                <p>
                  <b>Item Status:</b>{" "}
                  <span className="font-semibold">
                    {selectedItem.item.status}
                  </span>
                </p>
                <p>
                  <b>Order Date:</b>{" "}
                  {new Date(selectedItem.order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;

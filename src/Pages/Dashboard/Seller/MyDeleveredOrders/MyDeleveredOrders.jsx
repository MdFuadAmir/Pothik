import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";

const MyDeliveredOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["seller-delivered-orders", user.email],
    queryFn: async () =>
      (await axiosSecure.get(`/seller/delivered-orders/${user.email}`)).data
        .orders,
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">My Completed Orders</h2>

      <div className="overflow-x-auto border rounded p-4">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Delevered Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-5">
                  No delivered orders found
                </td>
              </tr>
            )}

            {data?.map((order) =>
              order.items.map((item) => (
                <tr key={item._id}>
                  <td>{order._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveredOrders;

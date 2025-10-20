import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";


const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

const { data: orders = [], isLoading } = useQuery({
  queryKey: ["orders", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/orders/seller/${user.email}`);
    return res.data;
  },
});

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-indigo-100 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">
        Seller Dashboard – Your Orders
      </h2>

     {orders.length === 0 ? (
  <p className="text-gray-500 text-center py-10">No orders yet 😴</p>
) : (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="table w-full text-center">
      <thead className="bg-indigo-900 text-white">
        <tr>
          <th>#</th>
          <th>Buyer</th>
          <th>Products</th>
          <th>Total</th>
          <th>Payment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order._id} className="hover:bg-indigo-100">
            <td>{index + 1}</td>
            <td>{order.userEmail}</td>
            <td className="text-left">
              {order.items.map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded" />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {p.quantity} | ৳{p.discountPrice}
                    </p>
                  </div>
                </div>
              ))}
            </td>
            <td className="font-semibold text-green-600">৳{order.totalSellerAmount}</td>
            <td>
              <span
                className={`px-2 py-1 rounded ${
                  order.paymentStatus === "paid"
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </td>
            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default ManageOrders;

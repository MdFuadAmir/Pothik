import { useQuery } from "@tanstack/react-query";
import {
  FaBox,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const OrderHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    // refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 bg-indigo-200 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
        <FaBox /> Order History
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Track your previous orders, see delivery updates, and manage your
        history.
      </p>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Order ID or Tracking ID..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-300"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-center text-white">
          <thead className="bg-indigo-900 text-sm uppercase text-gray-300">
            <tr>
              <th>#</th>
              <th className="p-4">Tracking</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="border-t border-indigo-800 hover:bg-indigo-900 transition-all"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{order.trackingId}</td>
                <td className="p-4">{order.items.length}</td>
                <td className="p-4">৳{order.grandTotal}</td>
                <td className="p-4">
                  {
                    order.orderStatus === 'Pending' ? <span className="text-amber-900 bg-amber-100 px-2 py-1 rounded">Pending</span> : order.orderStatus === 'Cancelled' ? <span className="text-red-900 bg-red-100 px-2 py-1 rounded">Cancled</span> :
                  <span className="text-green-900 bg-green-100 px-2 py-1 rounded">Recived</span>
                  }
                  
                 
                </td>

                <td className="p-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;

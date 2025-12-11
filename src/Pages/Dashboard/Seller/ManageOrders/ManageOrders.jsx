import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";
import { FaCheck, FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
              <th>Buyer</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((order) =>
              order.items.map((item) => (
                <tr key={item._id}>
                  <td>{order._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>{order.buyerInfo.email}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-3 items-center">
                    {/* view */}
                    <button className="btn btn-xs bg-green-100 border border-green-500">
                      <FaEye className="text-green-500" />
                    </button>
                    {/* accept */}
                    <button className="btn btn-xs bg-blue-100 border border-blue-500"><FaCheck className="text-blue-500"/></button>
                    {/* delete */}
                    <button className="btn btn-xs bg-red-100 border border-red-500">
                      <ImCross className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;

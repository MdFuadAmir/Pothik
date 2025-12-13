// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import useAuth from "../../../../Hooks/useAuth";
// import Loading from "../../../../Components/Loading/Loading";

// const MyDeliveredOrders = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["seller-delivered-orders", user?.email],
//     queryFn: async () =>
//       (await axiosSecure.get(`/seller/delivered-orders/${user.email}`)).data
//         .orders,
//     enabled: !!user?.email,
//   });

//   if (isLoading) return <Loading />;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-3">My Delivered Items</h2>

//       <div className="overflow-x-auto border rounded p-4">
//         <table className="table w-full">
//           <thead>
//             <tr className="bg-gray-100">
//               <th>Order ID</th>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>Delivered Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   No delivered items yet
//                 </td>
//               </tr>
//             )}

//             {orders.map((order) =>
//               order.items.map((item) => (
//                 <tr key={item._id}>
//                   <td>{order._id}</td>
//                   <td>{item.productName}</td>
//                   <td>{item.quantity}</td>
//                   <td>${item.price * item.quantity}</td>
//                   <td>
//                     {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyDeliveredOrders;


// MyDeliveredOrders.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";

const MyDeliveredOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["seller-delivered-orders", user?.email],
    queryFn: async () =>
      (await axiosSecure.get(`/seller/delivered-orders/${user.email}`)).data
        .orders,
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  // Flatten safe rows (only delivered items)
  const rows = orders.flatMap((order) =>
    (order.items || []).map((item) => ({
      ...item,
      orderId: order._id,
      deliveredAt: order.updatedAt || order.createdAt,
    }))
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">My Delivered Items</h2>

      <div className="overflow-x-auto border rounded p-4">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Delivered Date</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No delivered items yet
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row._id}>
                <td className="whitespace-nowrap">{row.orderId}</td>
                <td>{row.productName}</td>
                <td>{row.quantity}</td>
                <td>${row.price * row.quantity}</td>
                <td>{new Date(row.deliveredAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveredOrders;


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";
import { useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination";

const MyDeliveredOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: [
      "seller-delivered-orders",
      user?.email,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller/delivered-orders/${user.email}?page=${currentPage}&size=${itemsPerPage}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  if (isLoading) return <CompoLoading />;

  const orders = data?.orders || [];
  const totalOrders = data?.total || 0;

  // Flatten delivered items
  const rows = orders.flatMap((order) =>
    (order.items || []).map((item) => ({
      ...item,
      orderId: order._id,
      deliveredAt: order.updatedAt || order.createdAt,
    })),
  );

  // Pagination calculation
  const numOfPages = Math.ceil(totalOrders / itemsPerPage) || 1;

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-400">
        My Delivered Items ({totalOrders})
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>

      <div className="overflow-x-auto rounded p-4 bg-gray-900/80">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
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
                <td colSpan="5" className="text-center py-6 text-gray-300">
                  No delivered items yet
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={`${row.orderId}-${row._id}`} className="text-gray-300">
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

      {/* ✅ Pagination UI like Products page */}
      <div className="flex justify-center items-center gap-4 my-6">
        <Pagination
          page={currentPage + 1}
          setPage={(p) => setCurrentPage(p - 1)}
          totalPages={numOfPages}
        />

        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="border rounded px-2 py-1 border-emerald-400 text-emerald-400"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default MyDeliveredOrders;

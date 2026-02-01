import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";
import { useState } from "react";

const MyDeliveredOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔥 pagination state
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
        `/seller/delivered-orders/${user.email}?page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  if (isLoading) return <CompoLoading />;

  const orders = data?.orders || [];
  const totalOrders = data?.total || 0;

  // 🔥 flatten delivered items
  const rows = orders.flatMap((order) =>
    (order.items || []).map((item) => ({
      ...item,
      orderId: order._id,
      deliveredAt: order.updatedAt || order.createdAt,
    }))
  );

  // 🔥 pagination calc
  const numOfPages = Math.ceil(totalOrders / itemsPerPage) || 1;
  const pages = [...Array(numOfPages).keys()];

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < numOfPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-white">My Delivered Items ({totalOrders})</h2>
      <p className="text-sm text-gray-500 mb-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>

      <div className="overflow-x-auto  rounded p-4 bg-gray-500/20 dark:bg-gray-500/10">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-500/20 dark:bg-gray-500/10 dark:text-white">
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
              <tr key={`${row.orderId}-${row._id}`} className="dark:text-gray-300">
                <td className="whitespace-nowrap">{row.orderId}</td>
                <td>{row.productName}</td>
                <td>{row.quantity}</td>
                <td>${row.price * row.quantity}</td>
                <td>
                  {new Date(row.deliveredAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Pagination UI (same style) */}
      <div className="flex flex-wrap justify-center mt-10 gap-4 items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="btn dark:bg-gray-800 dark:text-white"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-full ${currentPage === page ? "bg-indigo-500" : ""}`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === numOfPages - 1}
          className="btn dark:bg-gray-800 dark:text-white"
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
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

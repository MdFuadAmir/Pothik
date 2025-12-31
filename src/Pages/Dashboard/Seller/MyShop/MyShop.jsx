import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Card from "../Card/Card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";
import { useState } from "react";

const MyShop = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 🔥 pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { data, isLoading } = useQuery({
    queryKey: ["myProducts", user?.email, currentPage, itemsPerPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // ✅ SAFE DATA
  const products = Array.isArray(data?.products) ? data.products : [];
  const totalProducts = data?.total || 0;

  // 🔥 pagination calc
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

  const handleUpdate = (product) => {
    navigate(`/dashboard/update-product/${product._id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts", user?.email]);
      toast.success("Product deleted successfully!");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <CompoLoading />;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1 dark:text-white">
          My Shop ({totalProducts})
        </h2>
        <p className="text-sm text-gray-600">
          Manage all your uploaded products here
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-200">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <Card
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>

      {/* 🔥 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className="btn"
          >
            Previous
          </button>

          {/* Page numbers */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn ${
                currentPage === page ? "bg-amber-500 text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="btn"
          >
            Next
          </button>

          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(0);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default MyShop;

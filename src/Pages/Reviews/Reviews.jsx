import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import CompoLoading from "../../Components/CompoLoading/CompoLoading";
import Pagination from "../../Components/Pagination/Pagination";
import { IoIosStar } from "react-icons/io";
const Reviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();

  // 🔥 pagination state (1-based for your component)
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", productId, page, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews/${productId}?page=${page}&limit=${itemsPerPage}`,
      );
      return res.data;
    },
    enabled: !!productId,
    keepPreviousData: true,
  });

  if (isLoading) return <CompoLoading />;
  if (error) return <p className="text-red-500">Failed to load reviews</p>;

  const reviews = data?.reviews || [];
  const totalPages = data?.totalPages || 1;

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setPage(1);
  };

  if (reviews.length === 0)
    return <p className="text-gray-200">No reviews yet for this product.</p>;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-emerald-500">Customer Reviews:</h1>

      {reviews.map((review) => (
        <div key={review._id} className="border-b border-white dark:border-gray-100">
          <div className="flex flex-col mb-2">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <IoIosStar />
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Avatar */}
              <img
                src={review.photo}
                alt="photo"
                className="w-10 h-10 rounded-full border object-cover"
              />
              <div>
                <p className="text-sm mb-1 font-semibold text-gray-200">
                  {review.name || review.userEmail}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-100 text-sm leading-relaxed pl-6 my-3">
            {review.comment || "No comment provided."}
          </p>
        </div>
      ))}

      {/* 🔥 New Pagination Component */}
      <div className="mt-6 space-y-4 flex justify-center items-center gap-8">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />

        <div className="flex justify-center">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="border rounded px-2 py-1 text-white"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

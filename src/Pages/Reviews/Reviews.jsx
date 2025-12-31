import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import CompoLoading from "../../Components/CompoLoading/CompoLoading";

const Reviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();
  
  // 🔥 pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", productId, currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews/${productId}?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    enabled: !!productId,
    keepPreviousData: true,
  });

  if (isLoading) return <CompoLoading />;
  if (error) return <p className="text-red-500">Failed to load reviews</p>;

  const reviews = data?.reviews || [];
  // const totalReviews = data?.totalReviews || 0;
  const totalPages = data?.totalPages || 1;

  const pages = [...Array(totalPages).keys()];

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  if (reviews.length === 0)
    return <p className="text-gray-500 dark:text-gray-300">No reviews yet for this product.</p>;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold dark:text-white">Customer Reviews:</h1>

      {reviews.map((review) => (
        <div key={review._id} className="border-b dark:border-gray-100">
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
                  ★
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <img
                src={review.photo}
                alt="/photo"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="text-sm mb-1 font-semibold text-gray-800 dark:text-white">
                  {review.name || review.userEmail}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-300">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-6 my-3">
            {review.comment || "No comment provided."}
          </p>
        </div>
      ))}

      {/* 🔥 Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-6 gap-4 items-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="btn border-none dark:bg-gray-800 dark:text-white"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn ${currentPage === page ? "bg-amber-500 border-none text-white" : ""}`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="btn border-none dark:bg-gray-800 dark:text-white"
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="border rounded px-2 py-1"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};

export default Reviews;

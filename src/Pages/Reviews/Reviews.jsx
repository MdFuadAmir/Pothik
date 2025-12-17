import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const Reviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      
      return res.data;
    },
    enabled: !!productId,
  });

  if (isLoading) return <Loading />;

  if (error) return <p className="text-red-500">Failed to load reviews</p>;

  if (reviews.length === 0)
    return <p className="text-gray-500">No reviews yet for this product.</p>;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Customer Reviews:</h1>
      {reviews.map((review) => (
        <div key={review._id} className="border-b">
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
                <p className="text-sm mb-1 font-semibold text-gray-800">
                  {review.name ? review.name : review.userEmail}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          {/* Comment */}
          <p className="text-gray-600 text-sm leading-relaxed pl-6 my-3">
            {review.comment || "No comment provided."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;


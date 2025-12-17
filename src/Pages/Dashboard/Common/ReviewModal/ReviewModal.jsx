import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";

const ReviewModal = ({ reviewData, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const finalData = {
        ...data,
        productId: reviewData.productId,
        orderId: reviewData.orderId,
        rating: Number(data.rating),
        comment: data.comment,
        userEmail: user.email,
        photo:user?.photoURL,
        name:user?.displayName,
        createdAt: new Date()
      };
      await axiosSecure.post("/reviews", finalData);
      toast.success("Review submitted!");
      reset();
      closeModal();
    } catch (err) {
      toast.error("Already review this product.", err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-3">
        <h2 className="font-semibold">Review this Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Rating */}
          <select
            {...register("rating", { required: true })}
            className="w-full border p-2 rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>
          {errors.rating && (
            <p className="text-red-500 text-xs">Rating is required</p>
          )}

          {/* Comment */}
          <textarea
            {...register("comment", {
              required: true,
              maxLength: {
                value: 300,
                message: "Comment must be under 300 characters",
              },
            })}
            className="w-full border p-2 rounded"
            placeholder="Write your review..."
          />
          {errors.comment && (
            <p className="text-red-500 text-xs">{errors.comment.message}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2 justify-center pt-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="border px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

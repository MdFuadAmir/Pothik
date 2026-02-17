import { FaStore } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ApplySellerButton = () => {
  const axiosSecure = useAxiosSecure();

  const handleApplySeller = async () => {
    try {
      const res = await axiosSecure.patch("/users/apply-seller");
      if (res.data.success) {
        toast.success(res.data.message || "Request sent!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send seller request"
      );
    }
  };
  return (
    <li>
      <button
        onClick={handleApplySeller}
        className="flex items-center gap-2 text-gray-100 hover:bg-emerald-600 font-bold"
      >
        <FaStore className="text-lg" />
        Apply to Seller
      </button>
    </li>
  );
};

export default ApplySellerButton;

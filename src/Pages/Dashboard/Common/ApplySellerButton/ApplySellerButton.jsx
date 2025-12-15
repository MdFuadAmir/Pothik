import { FaStore } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const ApplySellerButton = () => {
  const axiosSecure = useAxiosSecure();

  const handleApplySeller = async () => {
    try {
      const res = await axiosSecure.patch(`/users/apply-seller`);
      if (res.data.success) {
        toast.success("Seller request sent!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <li>
      <button
        onClick={handleApplySeller}
        className="flex items-center gap-2 text-white font-bold"
      >
        <FaStore className="text-lg" />
        Apply to Seller
      </button>
    </li>
  );
};

export default ApplySellerButton;

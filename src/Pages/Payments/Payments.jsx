import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const Payments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/${user.email}`);
      return res.data;
    },
  });
  const { data: address = [] } = useQuery({
    queryKey: ["addresses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/address/${user?.email}`);
      return res.data;
    },
  });
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountPrice * (item.quantity || 1),
    0
  );
  const totalDeliveryCharge = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.deliveryCharge) || 0),
    0
  );
  const total = subtotal + totalDeliveryCharge;
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-4">
      {/* Right Section - Summary */}
      <div className="bg-indigo-950 h-fit text-white p-5 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-3">Order Summary</h3>
        <hr className="mb-3" />
        <p className="flex justify-between mb-2 text-sm">
          <span>Items ({totalItems})</span> <span>৳{subtotal}</span>
        </p>
        <p className="flex justify-between mb-2 text-sm">
          <span>Delivery Charge</span> <span>৳{totalDeliveryCharge}</span>
        </p>
        <hr className="my-3" />
        <p className="flex justify-between font-semibold text-amber-500 text-sm">
          <span>Total:</span> <span>৳{total}</span>
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-black p-2 w-full mt-2 rounded">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Payments;

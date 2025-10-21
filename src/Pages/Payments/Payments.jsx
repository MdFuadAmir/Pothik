import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { FaMoneyBillWave } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router";
import card from "../../assets/paymentLogos/card.png";
import bkash from "../../assets/paymentLogos/bkash.png";
import nagad from "../../assets/paymentLogos/nagad.png";
import rocket from "../../assets/paymentLogos/rocket.png";
import cashOn from "../../assets/paymentLogos/cashon.png";

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
    <div className="p-4 bg-indigo-200 h-full">
      <h2 className="text-3xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
        {" "}
        <FaMoneyBillWave />
        Payment to Confirm Order
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/*  */}
        <div className="md:col-span-2 bg-indigo-300 p-4 rounded">
          <h2 className="text-lg font-semibold text-indigo-900 mb-6">
            Select Payment Method
          </h2>

          <div>
            <nav className="gap-4 flex">
              <NavLink 
                to={"payments/bank-payment"}
                className="bg-gray-100 p-2 "
              >
                <img src={card} alt="" className="w-16 h-16" />
              </NavLink>
              <NavLink
                to={"payments/bkash-payment"}
                className="bg-gray-100 p-2 "
              >
                <img src={bkash} alt="" className="w-16 h-16" />
              </NavLink>
              <NavLink
                to={"payments/nagad-payment"}
                className="bg-gray-100 p-2 "
              >
                <img src={nagad} alt="" className="w-16 h-16" />
              </NavLink>
              <NavLink
                to={"payments/rocket-payment"}
                className="bg-gray-100 p-2 "
              >
                <img src={rocket} alt="" className="w-16 h-16" />
              </NavLink>
              <NavLink
                to={"payments/cashOn-payment"}
                className="bg-gray-100 p-2 "
              >
                <img src={cashOn} alt="" className="w-16 h-16" />
              </NavLink>
            </nav>
            <Outlet></Outlet>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Payments;

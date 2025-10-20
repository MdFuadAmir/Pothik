import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { FaShop } from "react-icons/fa6";
import Loading from "../../Shared/Loading/Loading";

const ProceedToCheckOut = () => {
  const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [selectedAddress, setSelectedAddress] = useState();
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

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
    return (
        <div className="p-6 bg-indigo-100 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-900 mb-6">
        🧾 Review Your Order
      </h2>

      {/* Address Selection Card */}
      <div className="bg-indigo-950 rounded-xl shadow-md p-4 mb-6 border border-indigo-200">
        <h3 className="text-lg font-semibold mb-3 text-indigo-200">
          Select Delivery Address
        </h3>
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">-- Choose Address --</option>
          <option value="Home">🏠 Home - Mirpur, Dhaka</option>
          <option value="Office">🏢 Office - Dhanmondi, Dhaka</option>
          <option value="Other">📦 Other Address</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Section - Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-indigo-950 rounded p-4 shadow"
            >
                <h2 className="text-sm flex items-center gap-2 pb-1 text-green-500"><FaShop/> <span className="text-amber-600">{item.shopName}</span></h2>
                <hr className="text-white py-2"/>
                <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-gray-300">
                    Qty: {item.quantity} × ৳{item.discountPrice}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-green-500">
                ৳{item.discountPrice * (item.quantity || 1)}
              </p>
                </div>
            </div>
          ))}
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

          <button
            disabled={!selectedAddress}
            className={`mt-4 w-full py-2 rounded-md font-semibold ${
              selectedAddress
                ? "bg-amber-500 hover:bg-amber-600 text-black"
                : "bg-gray-500 cursor-not-allowed text-gray-300"
            }`}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
    );
};

export default ProceedToCheckOut;
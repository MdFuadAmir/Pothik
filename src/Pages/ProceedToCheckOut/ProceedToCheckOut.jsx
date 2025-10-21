import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaShop } from "react-icons/fa6";
import Loading from "../../Shared/Loading/Loading";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const ProceedToCheckOut = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const defaultAddress = address.find((addr) => addr.isDefault === true);

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
  const handlePayment = () =>{
  navigate("/dashboard/payments");
}
  return (
    <div className="p-6 bg-indigo-200 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-900 mb-6 flex item-center gap-2"><FaEye/> Review Your Order
      </h2>
      {/* Address Details */}
      <div onClick={() => navigate("/dashboard/address-book")} className=" cursor-pointer">
      {defaultAddress ? (
        <div className="bg-indigo-950 text-indigo-100 rounded-xl p-4 space-y-1 shadow-inner mb-6">
          {/* Header */}
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-xl font-semibold text-indigo-100 flex items-center gap-2">
          <FaMapMarkerAlt className="text-amber-400 text-lg" /> Delivery Address
        </h3>
        <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-1 rounded-full">
          Manage
        </span>
      </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <p>
              <span className="text-indigo-300 font-medium">Name:</span>{" "}
              {defaultAddress.name}
            </p>
            <p>
              <span className="text-indigo-300 font-medium">Phone:</span>{" "}
              {defaultAddress.phone}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between">
            <p>
              <span className="text-indigo-300 font-medium">City:</span>{" "}
              {defaultAddress.city}
            </p>
            <p>
              <span className="text-indigo-300 font-medium">Post Code:</span>{" "}
              {defaultAddress.postCode}
            </p>
          </div>

          <p>
            <span className="text-indigo-300 font-medium">Address:</span>{" "}
            {defaultAddress.address}
          </p>

          <p className="text-sm text-green-400 font-semibold pt-2 flex items-center gap-1">
            ✅ Default Address
          </p>
        </div>
      ) : (
        <div className="bg-indigo-900 text-indigo-200 rounded-xl p-4 border border-dashed border-indigo-700 text-center">
          <p className="font-semibold text-indigo-300 mb-1">
            No default address found 😴
          </p>
          <p className="text-sm text-indigo-400">Click to add or select one</p>
        </div>
      )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Section - Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-indigo-950 rounded p-4 shadow">
              <h2 className="text-sm flex items-center gap-2 pb-1 text-green-500">
                <FaShop />
                Shop:
                <span className="text-amber-600">{item.shopName}</span>
              </h2>
              <hr className="text-white py-2" />
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
          <button onClick={handlePayment} className="bg-amber-500 hover:bg-amber-600 text-black p-2 w-full mt-2 rounded">
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedToCheckOut;

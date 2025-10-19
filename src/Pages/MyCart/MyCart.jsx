import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const MyCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountPrice * (item.quantity || 1),
    0
  );
  const totalDeliveryCharge = cartItems.reduce((sum, item) => {
  return sum + (parseFloat(item.deliveryCharge) || 0);
}, 0);
  const total = subtotal + totalDeliveryCharge;

  // const deliveryChargeNumber = parseFloat(cartItems.deliveryCharge);
  // quantity update handler
  const handleQuantityChange = async (item, increment) => {
    const newQuantity = (item.quantity || 1) + increment;
    if (newQuantity < 1) return; // 1 এর নিচে না নামতে দেবে না

    try {
      // Optimistic UI update (optional, এখানে আমরা re-fetch দিয়ে সিঙ্ক করি)
      await axiosSecure.patch(`/carts/${item._id}`, { quantity: newQuantity });

      // React Query কে invalidate করে নতুন data fetch করা
      queryClient.invalidateQueries(["cart", user?.email]);
    } catch (error) {
      console.error("Quantity update failed:", error);
      Swal.fire("Error", "Quantity update failed!", "error");
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-4 bg-indigo-200 h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 flex gap-2">
        <FaShoppingCart />{" "}
        {user?.displayName ? `${user.displayName}’s Cart` : "My Cart"}
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        📦 Estimated Delivery:{" "}
        <span className="text-amber-500 font-semibold">2–4 Business Days</span>
      </p>

      {/*  ///////////////////////////////////////////*/}
      <div className="">
        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            🛒 Your cart is empty. Start shopping now!
          </div>
        ) : (
          <>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="overflow-x-auto flex-3">
                <table className="table w-full bg-indigo-950">
                  <thead className="bg-gray-900 text-indigo-200">
                    <tr className="text-center">
                      <th>#</th>
                      <th>image</th>
                      <th>Details</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Charge</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item._id} className="hover:bg-indigo-900">
                        <td className="text-white">{index + 1}</td>
                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 bg-indigo-100 rounded-lg object-cover"
                          />
                        </td>
                        <td>
                          <p className="font-semibold text-gray-300">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.color || "N/A"} | {item.size || "N/A"}
                          </p>
                        </td>
                        <td className="text-green-500 flex flex-col items-center">
                          <span>৳{item.discountPrice}</span>
                          <span className="line-through text-red text-sm text-red-500">
                            ৳{item.price}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              className="px-2 py-1 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-white">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="px-2 py-1 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="font-semibold text-green-500">
                          ৳{item.discountPrice * (item.quantity || 1)}
                        </td>
                        <td className="font-semibold text-amber-700">
                          ৳{item.deliveryCharge}
                        </td>
                        <td>
                          <button className="p-2 rounded bg-red-600 hover:bg-red-700 text-white">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Cart Summary */}
              <div className="flex-1 h-fit">
                <div className="bg-indigo-950 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Cart Summary
                  </h3>
                  <hr className="text-white mb-2"/>
                  <p className="flex justify-between text-white mb-2">
                    <span>SubTotal:</span><span>{subtotal}</span>
                  </p>
                  <p className="flex justify-between text-white mb-2">
                    <span>Delivery Charge:</span>{" "}
                    <span>৳{totalDeliveryCharge}</span>
                  </p>
                  <hr className="my-3 text-white" />
                  <p className="flex justify-between font-semibold text-amber-500 text-lg">
                    <span>Total:</span><span>৳{total}</span>
                  </p>
                  <button className="mt-4 py-2 rounded w-full bg-indigo-600 text-white hover:bg-indigo-700">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;

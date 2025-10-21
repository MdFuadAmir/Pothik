import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const CashOnPayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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
  const handleConfirm = async () => {
    if (!address || !cartItems?.length) {
      Swal.fire("Error", "Missing address or cart items", "error");
      return;
    }
    const orderData = {
      buyerEmail: user.email,
      buyerName: user.displayName,
      defaultAddress,
      paymentMethod: "Cash on Delivery",
      orderStatus: "Pending",
      date: new Date(),
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        shopName: item.shopName,
        sellerEmail: item.sellerEmail,
        price: item.discountPrice,
        quantity: item.quantity,
        deliveryCharge: item.deliveryCharge,
        total: item.discountPrice * (item.quantity || 1),
      })),
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);
      if (res.data.insertedId) {
        Swal.fire(
          "✅ Order Confirmed!",
          "Your order has been placed successfully!",
          "success"
        );
        await axiosSecure.delete(`/carts/clear/${user.email}`);
        if (res.data.deletedCount > 0) {
          Swal.fire(
            "✅ Cart Cleared!",
            "All items removed from cart.",
            "success"
          );
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to confirm order", "error");
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-indigo-400 p-4">
      <div className="text-indigo-950">
        <h3 className="text-2xl font-bold mb-3">Cash on Delivery</h3>
        <p className="text-gray-700 mb-4">
          Please review the instructions and conditions below before confirming
          your order:
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-800 bg-indigo-100 p-4 rounded-lg border border-indigo-200 mb-6">
          <li>✔ Payment will be collected in cash upon delivery.</li>
          <li>
            ✔ Make sure you or someone is available to receive the parcel at
            your delivery address.
          </li>
          <li>✔ Delivery agent will call you before reaching your location.</li>
          <li>✔ Once confirmed, the order cannot be canceled or modified.</li>
          <li>
            ✔ Please keep the exact amount ready to ensure a smooth handover.
          </li>
        </ul>

        <div className="text-center">
          <button
            onClick={handleConfirm}
            className="btn bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-md"
          >
            ✅ Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashOnPayment;

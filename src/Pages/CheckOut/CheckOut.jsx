import { useState, useMemo } from "react";
import Loading from "../../Components/Loading/Loading";
import useCart from "../../Hooks/useCart";
import CheckOutForm from "./CheckOutForm";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router";

const CheckOut = () => {
  const axiosInstance = useAxios();
  const { cart, isLoading, cartRefetch } = useCart();
  const [methods, setMethods] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const generateTrackingId = () =>
    "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  // 🧮 Subtotal
  const subTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0
    );
  }, [cart]);

  // 🧠 Group cart by sellerEmail
  const sellerGroups = useMemo(() => {
    const map = {};
    cart.forEach((item) => {
      if (!map[item.sellerEmail]) {
        map[item.sellerEmail] = [];
      }
      map[item.sellerEmail].push(item);
    });
    return map;
  }, [cart]);

  // 🚚 Shipping calculation (seller-wise)
  // const SHIPPING_PER_SELLER = 80;
  const SHIPPING_PER_SELLER =
    paymentMethod === "CASH_ON_DELIVERY"
      ? 120
      : paymentMethod === "STRIPE"
      ? 80
      : 120;

  const shipping = useMemo(() => {
    const sellerCount = Object.keys(sellerGroups).length;
    return sellerCount * SHIPPING_PER_SELLER;
  }, [sellerGroups, SHIPPING_PER_SELLER]);

  // 💰 Grand Total
  const grandTotal = subTotal + shipping;

  const handleOrderSubmit = () => {
    if (!methods) return;

    methods.handleSubmit(async (data) => {
      if (!paymentMethod) {
        return toast.error("Payment method required!");
      }

      const orderData = {
        trackingId: generateTrackingId(),
        userInfo: data,
        paymentMethod,
        items: cart,
        sellerWiseItems: sellerGroups, // 🔥 IMPORTANT
        subTotal,
        shipping,
        grandTotal,
        status: "pending",
        paymentStatus: "pending",
        createdAt: new Date(),
      };

      try {
        const res = await axiosInstance.post("/orders", orderData);

        if (res.data.insertedId) {
          toast.success("Order Confirmed!");
          await axiosInstance.delete(`/cart?email=${data?.email}`);
          cartRefetch();
          methods.reset();
          setPaymentMethod(null);
          navigate("/products");
        }
      } catch (error) {
        toast.error("Order failed!");
        console.log(error);
      }
    })();
  };

  if (isLoading) return <Loading />;

  if (cart.length === 0) {
    return (
      <div className="my-10 text-center text-gray-500 text-lg">
        Your cart is empty.
      </div>
    );
  }

  const isButtonDisabled =
    !methods || !methods.formState?.isValid || !paymentMethod;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 my-12">
      {/* Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-medium mb-6 dark:text-white">DELIVERY INFORMATION --</h2>
        <div className="border rounded dark:border-white">
          <CheckOutForm setMethods={setMethods} />
        </div>
      </div>

      {/* Summary */}
      <div className="w-full md:w-1/2 border p-4 rounded h-fit dark:border-white">
        <h2 className="text-lg font-bold mb-3 dark:text-white">Order Summary</h2>

        <div className="flex justify-between text-sm mb-2 dark:text-white">
          <span>Subtotal</span>
          <span>৳{subTotal}</span>
        </div>

        <div className="flex justify-between text-sm mb-2 dark:text-white">
          <span>Shipping ({Object.keys(sellerGroups).length} seller)</span>
          <span>৳{shipping}</span>
        </div>

        <div className="flex justify-between text-sm border-t dark:border-white dark:text-white pt-3">
          <span>Total</span>
          <span className="font-bold">৳{grandTotal}</span>
        </div>

        {/* Payment */}
        <div className="mt-6">
          <h3 className="text-gray-600 dark:text-gray-300">PAYMENT METHOD --</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* stripe */}
            <button
              onClick={() => setPaymentMethod("STRIPE")}
              disabled
              className={`border rounded p-1 text-sm disabled:bg-gray-300 dark:disabled:bg-gray-800 ${
                paymentMethod === "STRIPE" ? "bg-blue-500 text-white" : ""
              }`}
            >
              STRIPE
            </button>

            <button
              onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
              className={`border rounded p-1 text-sm dark:text-white ${
                paymentMethod === "CASH_ON_DELIVERY" ? "bg-blue-500 text-white" : ""
              }`}
            >
              CASH_ON_DELIVERY
            </button>
          </div>
        </div>
        <button
          onClick={handleOrderSubmit}
          disabled={isButtonDisabled}
          className={`mt-6 w-full py-2 rounded ${
            isButtonDisabled ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;

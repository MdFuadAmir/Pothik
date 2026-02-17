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
      0,
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
        sellerWiseItems: sellerGroups,
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
    <div className="flex flex-col md:flex-row items-center gap-6 my-12 px-4 md:px-10 lg:px-20">
      {/* Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400">
          DELIVERY INFORMATION --
        </h2>
        <div className="rounded">
          <CheckOutForm setMethods={setMethods} />
        </div>
      </div>

      {/* Summary */}
      <div className="w-full md:w-1/2  p-4 rounded h-fit bg-gray-900/80">
        <h2 className="text-lg font-bold mb-3 text-emerald-400">
          Order Summary
        </h2>

        <div className="flex justify-between text-sm mb-2 text-white">
          <span>Subtotal</span>
          <span>৳{subTotal}</span>
        </div>

        <div className="flex justify-between text-sm mb-2 text-white">
          <span>Shipping ({Object.keys(sellerGroups).length} seller)</span>
          <span>৳{shipping}</span>
        </div>

        <div className="flex justify-between text-sm border-t border-white text-white pt-3">
          <span>Total</span>
          <span className="font-bold">৳{grandTotal}</span>
        </div>

        {/* Payment */}
        <div className="mt-6">
          <h3 className="text-emerald-400">PAYMENT METHOD --</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* stripe */}
            <button
              onClick={() => setPaymentMethod("STRIPE")}
              disabled
              className={`rounded p-1 text-sm  disabled:bg-emerald-900/50 text-white ${
                paymentMethod === "STRIPE"
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-800"
              }`}
            >
              STRIPE
            </button>

            <button
              onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
              className={`rounded p-1 text-sm text-white ${
                paymentMethod === "CASH_ON_DELIVERY"
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-800"
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
            isButtonDisabled ? "bg-emerald-900/50 text-white cursor-not-allowed" : "bg-emerald-500 text-white"
          }`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;

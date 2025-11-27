import { useState } from "react";
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

  const generateTrackingId = () => {
  return "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );
  const shipping = subTotal >= 500 ? 80 : 120;
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
        subTotal,
        shipping,
        grandTotal,
        status: "pending",
        paymentStatus:"pending",
        createdAt: new Date(),
      };
      try {
        const res = await axiosInstance.post("/orders", orderData);
        if (res.data.insertedId) {
          toast.success("Order Confirmf!");
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

  if (cart.length === 0) {
    return (
      <div className="my-10 text-center text-gray-500 text-lg">
        Your cart is empty. Add items before checking out.
      </div>
    );
  }

  if (isLoading) return <Loading />;

  const isButtonDisabled =
    !methods ||
    !methods.formState ||
    !methods.formState.isValid ||
    !paymentMethod;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 my-12">
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-medium text-gray-600 mb-6">
          DELIVERY INFORMATION --
        </h2>
        <div className="border rounded">
          <CheckOutForm setMethods={setMethods} />
        </div>
      </div>

      {/* Totals */}
      <div className="w-full mt-0 md:mt-12 md:w-1/2 border p-4 rounded h-fit">
        <div>
          <h2 className="text-lg font-bold mb-3">Order Summary</h2>

          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping Fee:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm border-t pt-3">
            <span>Total:</span>
            <span className="font-bold">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-gray-600">PAYMENT METHOD --</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* BKASH */}
            <button
              // onClick={() => handleBkash()}
              onClick={() => setPaymentMethod("BKASH")}
              className={`border rounded text-center p-1 text-sm ${
                paymentMethod === "BKASH" ? "bg-blue-500 text-white" : ""
              }`}
            >
              BKASH
            </button>

            {/* STRIPE */}
            <button
              // onClick={() => handleStripe()}
              onClick={() => setPaymentMethod("STRIPE")}
              className={`border rounded text-center p-1 text-sm ${
                paymentMethod === "STRIPE" ? "bg-blue-500 text-white" : ""
              }`}
            >
              STRIPE
            </button>

            {/* CASH ON DELIVERY */}
            <button
              // onClick={() => handleCOD()}
              onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
              className={`border rounded text-center p-1 text-sm ${
                paymentMethod === "CASH_ON_DELIVERY"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>

        <button
          onClick={handleOrderSubmit}
          disabled={isButtonDisabled}
          className={`mt-6 text-sm w-full py-2 rounded 
            ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;

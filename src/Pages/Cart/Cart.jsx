import { useMemo } from "react";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import useCart from "../../Hooks/useCart";
import { Link } from "react-router";

const Cart = () => {
  const axiosInstance = useAxios();
  const { cart, isLoading, cartRefetch } = useCart();

  const handleRemove = async (id) => {
    await axiosInstance.delete(`/cart/${id}`);
    cartRefetch();
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    await axiosInstance.patch(`/cart/${id}`, { quantity: newQuantity });
    cartRefetch();
  };

  // 🧮 Subtotal
  const subTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0,
    );
  }, [cart]);

  // 🧠 Group by sellerEmail
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

  // 🚚 Seller-wise shipping

  const SHIPPING_PER_SELLER = 120;

  const shipping = useMemo(() => {
    const sellerCount = Object.keys(sellerGroups).length;
    return sellerCount * SHIPPING_PER_SELLER;
  }, [sellerGroups]);

  // 💰 Grand Total
  const grandTotal = subTotal + shipping;

  if (isLoading) return <Loading />;

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Your Cart ({cart.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-white">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-3 rounded shadow-md bg-gray-500/10 dark:bg-gray-500/10"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                  alt={item.productName}
                />

                <div className="flex-1">
                  <h2 className="font-semibold dark:text-white">
                    {item.productName}
                  </h2>

                  <p className="text-green-600 font-bold">৳{item.price}</p>

                  <div className="flex items-center gap-2 mt-2 dark:text-white ">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, (item.quantity ?? 1) - 1)
                      }
                      className="px-2 border rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity ?? 1}</span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, (item.quantity ?? 1) + 1)
                      }
                      className="px-2 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="ml-4 text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-bold dark:text-white">
                  ৳{(item.price * (item.quantity ?? 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        <div className="shadow-md h-fit p-4 rounded bg-gray-500/10 dark:bg-gray-500/10">
          <h1 className="font-semibold text-gray-600 mb-2 dark:text-gray-400">
            CART_TOTALS ----
          </h1>

          <h2 className="text-sm border-b p-2 flex justify-between dark:text-white">
            Subtotal
            <span>৳ {subTotal.toFixed(2)}</span>
          </h2>

          <h2 className="text-sm border-b p-2 flex justify-between dark:text-white">
            Shipping ({Object.keys(sellerGroups).length} seller)
            <span>৳ {shipping.toFixed(2)}</span>
          </h2>

          <h2 className="text-sm p-2 flex justify-between dark:text-white">
            Total
            <span className="font-bold">৳ {grandTotal.toFixed(2)}</span>
          </h2>

          <Link
            to="/checkout"
            className="flex justify-center w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded text-sm"
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import useCart from "../../Hooks/useCart";
import { Link } from "react-router";

const Cart = () => {
  const axiosInstance = useAxios();
  const { cart, isLoading, cartRefetch } = useCart();

  const handleRrmove = async (id) => {
    await axiosInstance.delete(`/cart/${id}`);
    cartRefetch();
  };
  const handleUpdateQuentity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    await axiosInstance.patch(`/cart/${id}`, {
      quantity: newQuantity,
    });
    cartRefetch();
  };
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
    0
  );
  const shipping = subTotal >= 500 ? 80 : 120;
  const grandTotal = subTotal + shipping;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({cart?.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border p-3 rounded bg-white"
              >
                <img
                  src={item?.image}
                  className="w-20 h-20 object-cover rounded"
                  alt={item?.productName}
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item?.productName}</h2>
                  <p className="text-green-600 font-bold">${item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleUpdateQuentity(item._id, item?.quantity - 1)
                      }
                      className="px-2 border rounded cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity ?? 1}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuentity(item._id, item?.quantity + 1)
                      }
                      className="px-2 border rounded cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRrmove(item._id)}
                      className="ml-4 text-red-500 text-sm cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-bold">
                  ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* Total Section */}
        <div className="border h-fit p-4 rounded bg-white">
          <h1 className="font-semibold text-gray-600">CART TOTALS ----</h1>
          <div className="">
            <h2 className="text-sm border-b p-2 flex justify-between">
              Subtotal <span>$ {subTotal.toFixed(2)}</span>
            </h2>
            <h2 className="text-sm border-b p-2 flex justify-between">
              Shipping Fee <span>$ {shipping.toFixed(2)}</span>
            </h2>
            <h2 className="text-sm p-2 flex justify-between">
              Total <span className="font-bold">$ {grandTotal.toFixed(2)}</span>
            </h2>
          </div>
          <Link to={'/checkout'}  className="flex justify-center w-full mt-4 bg-black text-white py-2 rounded text-sm">
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;


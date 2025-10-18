import React, { useState } from "react";
import {
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const MyCart = () => {
  const { user } = useAuth();
  // 🧾 Fake cart data (you can replace it with Tanstack Query later)
  const [cartItems, setCartItems] = useState([
    {
      _id: "c1",
      name: "Wireless Bluetooth Headphones",
      image:
        "https://i.ibb.co.com/4Z1Ff2f0/465222569-1082699996860225-7721382993140538340-n.jpg",
      price: 1850,
      quantity: 1,
      discount: 10,
      color: "Black",
      size: "M",
    },
    {
      _id: "c2",
      name: "Smart Fitness Band",
      image:
        "https://i.ibb.co.com/4Z1Ff2f0/465222569-1082699996860225-7721382993140538340-n.jpg",
      price: 1250,
      quantity: 2,
      discount: 5,
      color: "Blue",
      size: "Free",
    },
    {
      _id: "c3",
      name: "Laptop Backpack",
      image:
        "https://i.ibb.co.com/4Z1Ff2f0/465222569-1082699996860225-7721382993140538340-n.jpg",
      price: 2200,
      quantity: 1,
      discount: 15,
      color: "Gray",
      size: "L",
    },
    {
      _id: "c4",
      name: "Laptop Backpack",
      image:
        "https://i.ibb.co.com/4Z1Ff2f0/465222569-1082699996860225-7721382993140538340-n.jpg",
      price: 2200,
      quantity: 1,
      discount: 15,
      color: "Gray",
      size: "L",
    },
    
  ]);

  // 🧮 Functions
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // 🧾 Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountTotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.discount * item.quantity) / 100,
    0
  );
  const deliveryCharge = subtotal > 3000 ? 0 : 100;
  const grandTotal = subtotal - discountTotal + deliveryCharge;

  return (
    <div className="p-4 bg-indigo-200 h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 flex gap-2">
        <FaShoppingCart />{" "}
        {user?.displayName ? `${user.displayName}’s Cart` : "My Cart"}
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        📦 Estimated Delivery:{" "}
        <span className="text-amber-500 font-semibold">
          2–4 Business Days
        </span>
      </p>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>Your cart is empty</p>
          <Link
            to={"/products"}
            className="mt-4 bg-indigo-900 text-white px-5 py-2 rounded-lg"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧩 Left Side: Cart Items */}
          <div className="lg:col-span-2 bg-indigo-950 rounded-xl shadow-lg border border-gray-100">
            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center gap-4 p-4 hover:bg-indigo-900"
                >
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg text-base-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Discount: {item.discount}%
                    </p>
                    <p className="mt-1 font-bold text-green-500">
                      ৳{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-center md:items-end space-y-2">
                    {/* Quantity control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="bg-indigo-800 text-white p-1 rounded"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-semibold text-base-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="bg-indigo-800 text-white p-1 rounded"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  {/* Total + Remove */}
                  <div className="flex flex-col items-center md:items-end gap-2">
                    <p className="font-bold text-green-500">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <FaTrashAlt /> Remove
                      </button>
                      <button
                        className="text-cyan-400 hover:text-cyan-500 text-xs flex items-center"
                        // onClick={() => handleSaveForLater(item._id)}
                      >
                        <FaHeart className="mr-1" /> Save for later
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 💰 Right Side: Summary */}
          <div className="bg-indigo-950 rounded-xl shadow-lg border p-6 h-fit">
            <h3 className="text-lg font-semibold text-white border-b pb-3 mb-3">
              Order Summary
            </h3>
            <div className="my-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-indigo-900 text-white placeholder-gray-400"
              />
              <button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                Apply Coupon
              </button>
            </div>

            <div className="space-y-2 text-white">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">
                  -৳{discountTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className=" text-cyan-200">
                  {deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-amber-500 text-lg">
                <span>Grand Total</span>
                <span>৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
              <span>🔒</span>
              <span>Your payment is secure with SSL encryption</span>
            </div>
            <button className="mt-2 w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold transition-all duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;

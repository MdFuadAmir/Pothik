import React from "react";
import { FaFireAlt, FaShoppingCart } from "react-icons/fa";

const BestDeals = () => {
  const deals = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      image: "https://i.ibb.co/0y1HcRr/headphones.jpg",
      oldPrice: 2500,
      newPrice: 1850,
      discount: 26,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Smart Fitness Band",
      image: "https://i.ibb.co/4fRsh6Y/fitnessband.jpg",
      oldPrice: 1800,
      newPrice: 1250,
      discount: 30,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Gaming Mouse RGB",
      image: "https://i.ibb.co/8gXq5fD/mouse.jpg",
      oldPrice: 1200,
      newPrice: 890,
      discount: 25,
      rating: 4.5,
    },
    {
      id: 4,
      name: "Laptop Backpack",
      image: "https://i.ibb.co/3CnbK8z/backpack.jpg",
      oldPrice: 2600,
      newPrice: 1990,
      discount: 23,
      rating: 4.7,
    },
  ];

  return (
    <div className="py-10 p-4">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 flex justify-center items-center gap-2">
          <FaFireAlt className="text-red-500" /> Best Deals
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Don’t miss today’s hottest discounts — grab your favorite products before they’re gone!
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-indigo-950 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
          >
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                -{deal.discount}%
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-200 text-lg line-clamp-1">
                {deal.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold text-lg">
                  ৳{deal.newPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ৳{deal.oldPrice}
                </span>
              </div>
              <div className="text-yellow-500 text-sm">⭐ {deal.rating} / 5</div>

              <button className="mt-3 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition duration-200">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-10">
        <button className="bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
          View All Deals
        </button>
      </div>
    </div>
  );
};

export default BestDeals;

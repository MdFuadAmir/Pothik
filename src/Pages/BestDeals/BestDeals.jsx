const bestDeals = [
  {
    title: "Wireless Earbuds",
    img: "https://i.ibb.co/0F2F5BR/earbuds.png",
    price: 1200,
    oldPrice: 2200,
    discount: 45,
  },
  {
    title: "Smart Watch",
    img: "https://i.ibb.co/vHv7zTt/watch.png",
    price: 1800,
    oldPrice: 3500,
    discount: 48,
  },
  {
    title: "Bluetooth Speaker",
    img: "https://i.ibb.co/0VtmJgP/speaker.png",
    price: 950,
    oldPrice: 1500,
    discount: 35,
  },
  {
    title: "Gaming Keyboard",
    img: "https://i.ibb.co/GsWmQjJ/keyboard.png",
    price: 2200,
    oldPrice: 3800,
    discount: 42,
  },
  {
    title: "LED Light Strip",
    img: "https://i.ibb.co/YyBcxLS/light.png",
    price: 350,
    oldPrice: 550,
    discount: 30,
  },
  {
    title: "USB Hub 3.0",
    img: "https://i.ibb.co/Kb2H2ZS/hub.png",
    price: 499,
    oldPrice: 850,
    discount: 41,
  },
];
const BestDeals = () => {
  return (
    <div className="mx-auto py-8">
      {/* Title */}
      <div className="flex justify-between items-center px-4 mb-6">
      <h2 className="text-2xl font-semibold">Best Deals</h2>
        <button className=" btn btn-outline border-green-500 border-2 px-6">All Deals</button>
      </div>
      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {bestDeals.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg p-3 cursor-pointer transition"
          >
            {/* Product Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-32 object-contain mb-3"
            />

            {/* Title */}
            <p className="text-sm font-medium h-10">{item.title}</p>

            {/* Price Section */}
            <div className="mt-2">
              <span className="text-lg font-bold text-orange-600">
                ৳{item.price}
              </span>

              <div className="text-xs text-gray-500 line-through">
                ৳{item.oldPrice}
              </div>

              <div className="text-xs font-semibold text-green-600">
                {item.discount}% OFF
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestDeals;

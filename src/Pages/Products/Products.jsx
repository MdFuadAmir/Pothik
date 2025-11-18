const products = [
  {
    title: "Wireless Earbuds",
    img: "https://i.ibb.co/0F2F5BR/earbuds.png",
    price: 1200,
  },
  {
    title: "Smart Watch",
    img: "https://i.ibb.co/vHv7zTt/watch.png",
    price: 1800,
  },
  {
    title: "Bluetooth Speaker",
    img: "https://i.ibb.co/0VtmJgP/speaker.png",
    price: 950,
  },
  {
    title: "Gaming Keyboard",
    img: "https://i.ibb.co/GsWmQjJ/keyboard.png",
    price: 2200,
  },
  {
    title: "LED Light Strip",
    img: "https://i.ibb.co/YyBcxLS/light.png",
    price: 350,
  },
  {
    title: "USB Hub 3.0",
    img: "https://i.ibb.co/Kb2H2ZS/hub.png",
    price: 499,
  },
  {
    title: "Laptop Stand",
    img: "https://i.ibb.co/dBnDSyW/laptop.png",
    price: 899,
  },
  {
    title: "Neckband Earphone",
    img: "https://i.ibb.co/d40v2wZ/neckband.png",
    price: 599,
  },
  {
    title: "Mini Tripod",
    img: "https://i.ibb.co/C6H4n03/tripod.png",
    price: 250,
  },
  {
    title: "Power Bank 20000mAh",
    img: "https://i.ibb.co/2FQbvgN/powerbank.png",
    price: 1650,
  },
  {
    title: "Air Cooler",
    img: "https://i.ibb.co/NCm8khR/cooler.png",
    price: 1450,
  },
  {
    title: "USB Fast Charger",
    img: "https://i.ibb.co/tLnrH8h/charger.png",
    price: 350,
  },
  {
    title: "Smartphone Holder",
    img: "https://i.ibb.co/1QG8zsY/holder.png",
    price: 120,
  },
  {
    title: "Portable Fan",
    img: "https://i.ibb.co/B2h2N8V/fan.png",
    price: 299,
  },
  {
    title: "Backpack",
    img: "https://i.ibb.co/Vxr3Vpb/bag.png",
    price: 750,
  },
];


const Products = () => {
    return (
         <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">For You</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-32 object-contain mb-3"
            />

            <p className="font-medium text-sm h-10">{item.title}</p>

            <p className="text-orange-600 font-bold mt-2">৳{item.price}</p>
          </div>
        ))}
      </div>

      {/* All Products Button */}
      <div className="flex justify-center mt-10">
        <button className="px-8 btn btn-outline border-2 border-green-500 text-lg font-semibold rounded-md cursor-pointer">
          All Products
        </button>
      </div>

    </div>
    );
};

export default Products;
const products = [
  {
    title: "Wireless Earbuds",
    img: "https://i.ibb.co.com/BH7J0jGk/asf.png",
    price: 1200,
  },
  {
    title: "Smart Watch",
    img: "https://i.ibb.co.com/BH7J0jGk/asf.png",
    price: 1800,
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
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";
const Favorite = () => {
  const axiosSecure = useAxiosSecure();


  const { data: products = [],isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data;
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }
  return (
    <div className="bg-indigo-200 p-4">
      <h2 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
        <FaHeart className="text-red-600" /> My Favorites
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        All your saved products are here. Move them to cart or remove if you
        change your mind.
      </p>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="bg-indigo-950 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                -{product?.discount}%
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white line-clamp-1">
                {product?.name}
              </h3>
              <p className="text-sm text-gray-500">{product?.brand}</p>
              <div className="flex items-center mt-2 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-lg font-bold text-indigo-600">
                    ৳{product.discountPrice}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ৳{product.price}
                  </p>
                </div>
                <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition">
                  <FaShoppingCart />
                </button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button className="text-sm font-semibold text-indigo-600 hover:underline">
                  View Details
                </button>
                <button className="text-gray-500 hover:text-red-600 transition">
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;

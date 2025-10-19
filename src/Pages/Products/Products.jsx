import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Shared/Sectiontitle/SectionTitle";
import Loading from "../../Shared/Loading/Loading";
import { useNavigate } from "react-router";

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: products = [],isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }
  return (
    <div className="bg-indigo-200 p-4">
      <SectionTitle
        sectionTitle={'Available Products'}
        sectionSubTitle={
          "Discover trending products from verified sellers — ready to be delivered anywhere."
        }
      ></SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="rounded shadow-md hover:shadow-xl transition duration-300 overflow-hidden group bg-indigo-950"
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
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={()=> navigate(`/products/${product._id}`)} className="text-sm font-semibold text-indigo-600 hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

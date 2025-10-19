import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import { useNavigate, useParams } from "react-router";
import { FaShieldAlt, FaStar, FaTruck, FaUndo } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ProductDetails = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: product = [], isLoading } = useQuery({
    queryKey: ["product", id],
    enabled: !!id, // id থাকলেই query চালু হবে
    queryFn: async () => {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    },
  });

  // add to cart functionality
  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire(
        "Error",
        "You must be logged in to add items to cart!",
        "error"
      );
      navigate("/login");
    }
    const cartItem = {
      email: user?.email,
      productId: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      discountPrice: product.discountPrice,
      quantity: 1,
      image: product.image,
      deliveryCharge: product.deliveryCharge,
      size: product.size,
      stock: product.stock,
      color: product.color,
    };
    try {
      const res = await axiosSecure.post("/carts", cartItem);
      if (res.data.insertedId) {
        Swal.fire("Added!", "Product added to your cart.", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add product to cart.", "error");
    }
  };

  if (isLoading) return <Loading />;
  if (!product) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Product not found!
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto bg-indigo-50 rounded-xl shadow-lg overflow-hidden my-10">
      {/* Product Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Image */}
        <div className="flex justify-center items-center bg-indigo-300 rounded-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 text-sm mb-4">{product.brand}</p>

          {/* Rating & Category */}
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-gray-500 text-sm">(4.0)</span>
          </div>

          <div className="text-sm text-gray-500 mb-3">
            Category: <span className="font-semibold">{product.category}</span>{" "}
            / <span className="text-gray-600">{product.subCategory}</span>
          </div>

          {/* Price Info */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-indigo-700">
              ৳{product.discountPrice}
            </span>
            <span className="text-gray-400 line-through">৳{product.price}</span>
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
              -{product.discount}%
            </span>
          </div>

          {/* Stock & Color */}
          <div className="text-gray-700 mb-3">
            <p>
              <span className="font-semibold">Stock:</span> {product.stock} pcs
            </p>
            <p>
              <span className="font-semibold">Colors:</span> {product.color}
            </p>
            <p>
              <span className="font-semibold">Sizes:</span> {product.size}
            </p>
          </div>

          {/* Delivery Info */}
          <div className="mt-4 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <FaTruck className="text-indigo-600" /> Delivery Time:{" "}
              <span className="font-semibold">{product.deliveryTime} Days</span>
            </p>
            <p className="flex items-center gap-2">
              <FaUndo className="text-indigo-600" /> Return Policy:{" "}
              <span className="font-semibold">{product.returnPolicy} Days</span>
            </p>
            <p className="flex items-center gap-2">
              <FaShieldAlt className="text-indigo-600" /> Warranty:{" "}
              <span className="font-semibold">{product.warranty} Months</span>
            </p>
          </div>

          {/* Seller Info */}
          <div className="mt-4 text-gray-700">
            <p>
              <span className="font-semibold">Seller Email:</span>{" "}
              {product.email}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {product.location}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
            <button className="border border-indigo-600 text-indigo-700 px-6 py-2 rounded-lg hover:bg-indigo-100 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 mt-4">
        <h2 className="text-xl font-semibold text-indigo-900 mb-2">
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {product.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

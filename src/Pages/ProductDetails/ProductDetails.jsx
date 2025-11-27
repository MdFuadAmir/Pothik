import { useNavigate, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [mainImage, setMainImage] = useState(0);
  const navigate = useNavigate();

  const { cartRefetch } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!product) return;
    // Add to Cart Data
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.offerPrice,
      image: product.images[0],
      email: user.email,
      quantity: 1,
    };

    try {
      const res = await axiosInstance.post("/cart", cartItem);
      if (res?.data?.insertedId) {
        toast.success("Add to cart successfully!");
        console.log(res.data);
        cartRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
        <div>
          <div className="w-full h-72 p-2 rounded-lg overflow-hidden border">
            <img
              src={product?.images[mainImage]}
              alt={`Product ${mainImage}`}
              className="w-full h-full rounded object-cover overflow-hidden"
            />
          </div>
          <div className="flex gap-2 mt-3 justify-center overflow-x-auto">
            {product?.images?.map((img, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded border cursor-pointer overflow-hidden ${
                  mainImage === idx ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(idx)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{product?.title}</h1>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <p className="font-medium">{product?.rating}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-green-600 font-bold text-2xl">
              ${product?.offerPrice}
            </p>
            <p className="line-through text-gray-500">${product?.price}</p>
          </div>
          <p className="text-sm text-gray-600">
            In Stock: <span className="font-semibold">{product?.stock}</span>
          </p>
          <p className="text-sm text-gray-700">
            Brand: <span className="font-semibold">{product?.brand}</span>
          </p>
          <p className="text-sm text-gray-700">
            Category: <span className="font-semibold">{product?.category}</span>
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {product?.tags?.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 w-full cursor-pointer md:w-1/2 mx-auto border-2 mt-4 rounded hover:bg-gray-400 hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-bold">Description</h2>
        <p className="text-sm">{product?.description}</p>
      </div>
      <div className="my-12 p-4 border rounded">
        <h2>Reviews</h2>
      </div>
    </div>
  );
};

export default ProductDetails;



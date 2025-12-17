import { useNavigate, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useCart from "../../Hooks/useCart";
import Reviews from "../Reviews/Reviews";

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
    const price = product?.discountPrice
      ? Number(product.discountPrice)
      : Number(product.regularPrice);

    const cartItem = {
      productId: product._id,
      productName: product?.productName,
      price: price,
      image: product.images[0],
      email: user?.email,
      sellerEmail: product.email,
      status: "pending",
      quantity: 1,
    };

    try {
      const res = await axiosInstance.post("/cart", cartItem);
      if (res?.data?.insertedId) {
        toast.success("Add to cart successfully!");

        cartRefetch();
      }
    } catch (error) {
      toast.error(error.message);
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
          <h1 className="text-xl font-bold">{product?.productName}</h1>
          <div className="flex gap-4 mt-2">
            {product?.discountPrice ? (
              <div className="flex items-center gap-2">
                <p className="text-red-500 line-through text-sm font-semibold">
                  ${product?.regularPrice}
                </p>
                <p className="text-green-600 font-bold text-md">
                  ${product?.discountPrice}
                </p>
              </div>
            ) : (
              <p className="text-green-600 font-bold text-sm">
                ${product?.regularPrice}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-600">
            In Stock: <span className="font-semibold">{product?.stockQua}</span>
          </p>
          <p className="text-sm text-gray-600">
            seller email:{" "}
            <span className="font-semibold">{product?.email}</span>
          </p>
          <p className="text-sm text-gray-700">
            Brand: <span className="font-semibold">{product?.brand}</span>
          </p>
          {product?.size && (
            <p className="text-sm text-gray-700">
              Size: <span className="font-semibold">{product?.size}</span>
            </p>
          )}
          {product?.color && (
            <p className="text-sm text-gray-700">
              Color: <span className="font-semibold">{product?.color}</span>
            </p>
          )}
          {product?.fabric && (
            <p className="text-sm text-gray-700">
              Fabric: <span className="font-semibold">{product?.fabric}</span>
            </p>
          )}
          {product?.weightQty && (
            <p className="text-sm text-gray-700">
              Weight:{" "}
              <span className="font-semibold">{product?.weightQty}</span>
            </p>
          )}
          {product?.ingredients && (
            <p className="text-sm text-gray-700">
              Ingredients:{" "}
              <span className="font-semibold">{product?.ingredients}</span>
            </p>
          )}
          {product?.packagingType && (
            <p className="text-sm text-gray-700">
              Packaging Type:{" "}
              <span className="font-semibold">{product?.packagingType}</span>
            </p>
          )}
          {product?.condition && (
            <p className="text-sm text-gray-700">
              condition:{" "}
              <span className="font-semibold">{product?.condition}</span>
            </p>
          )}
          <p className="text-sm text-gray-700">
            Return Policy:{" "}
            <span className="font-semibold">{product?.returnPolicy}</span>
          </p>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <p className="font-medium">{product?.rating}</p>
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
        <p className="text-sm">{product?.longDescription}</p>
      </div>
      <div className="my-12 p-4 border rounded">
        <Reviews productId={product._id}/>
      </div>
      
    </div>
  );
};

export default ProductDetails;

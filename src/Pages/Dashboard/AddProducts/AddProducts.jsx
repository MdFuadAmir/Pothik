import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import { FaPlusSquare } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {user} = useAuth();
  const [productImage, setProductImage] = useState("");
  const [upLoading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleImageUploade = async (e) => {
    const image = e.target.files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadeUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadeUrl, formData);
    setProductImage(res.data.data.url);
    setUploading(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (!productImage) {
      Swal.fire("Please upload a product image!");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be add this product in your shop",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it",
    }).then((result) => {
      if (result.isConfirmed) {
        const newProduct = {
          ...data,
          image: productImage,
          discountPrice: Math.round(data.price - (data.price * data.discount / 100)),
          createdAt: new Date().toISOString(),
        };
        console.log(newProduct);
        axiosSecure.post("/products", newProduct)
        // todo: redirect to my products page
        .then((res) => {
          if (res.data.insertedId) {
            console.log(res.data);
            Swal.fire({
              title: "success!",
              text: "Your product has been added",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-indigo-200 p-4">
      <SectionTitle
        sectionTitle={"Add New Product"}
        sectionSubTitle={
          "Fill out the details below to add a new product to your store."
        }
      ></SectionTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-indigo-950 p-4 md:p-6 rounded-lg"
      >
        {/* Product Name */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Product Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* todo */}
        {/* Category */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Select a category
            </option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Groceries</option>
            <option>Beauty & Health</option>
            <option>Home & Living</option>
            <option>Sports & Fitness</option>
            <option>Books & Stationery</option>
          </select>
          {errors?.category && (
            <span className="text-red-500">
              Please select a product Category
            </span>
          )}
        </div>
        {/* Sub Category */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Sub Category</label>
          <input
            {...register("subCategory", { required: true })}
            type="text"
            placeholder="e.g., Men's Shoes"
            className="input input-bordered w-full"
          />
          {errors.subCategory?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Brand */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Brand</label>
          <input
            {...register("brand", { required: true })}
            type="text"
            placeholder="Brand Name"
            className="input input-bordered w-full"
          />
          {errors.brand?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Product Condition */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Product Condition</label>
          <select
            {...register("condition", { required: true })}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Select Condition
            </option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </select>
          {errors.condition && (
            <span className="text-red-500">
              Please select a product condition
            </span>
          )}
        </div>
        {/* reguler price Price */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Reguler Price (৳)</label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Regular Price"
            className="input input-bordered w-full"
          />
          {errors.price?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Discount Price */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Discount(%)</label>
          <input
            {...register("discount")}
            type="number"
            placeholder="Discounted Price 5%"
            className="input input-bordered w-full"
          />
        </div>
        {/* Stock Quantity */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Stock Quantity</label>
          <input
            {...register("stock", { required: true })}
            type="number"
            placeholder="Available Quantity"
            className="input input-bordered w-full"
          />
          {errors.stock?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Color */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Color Options</label>
          <input
            {...register("color", { required: true })}
            type="text"
            placeholder="Red, Blue, Black"
            className="input input-bordered w-full"
          />
          {errors.color?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Size */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Size Options</label>
          <input
            {...register("size", { required: true })}
            type="text"
            placeholder="S, M, L, XL"
            className="input input-bordered w-full"
          />
          {errors.size?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Weight */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Product Weight</label>
          <input
            {...register("weight", { required: true })}
            type="number"
            step="0.01"
            placeholder="1.2kg"
            className="input input-bordered w-full"
          />
          {errors.weight?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Warranty */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Warranty</label>
          <input
            {...register("warranty", { required: true })}
            type="number"
            placeholder="6/24 months warranty"
            className="input input-bordered w-full"
          />
          {errors.warranty?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Delivery Charge */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Delivery Charge (৳)</label>
          <input
            {...register("deliveryCharge", { required: true })}
            type="number"
            placeholder="e.g., 100"
            className="input input-bordered w-full"
          />
          {errors.deliveryCharge?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Shipping Location */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Shop Location</label>
          <input
            {...register("location", { required: true })}
            type="text"
            placeholder="Dhaka, Bangladesh"
            className="input input-bordered w-full"
          />
          {errors.location?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Estimated Delivery */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Delivery Time Estimate</label>
          <input
            {...register("deliveryTime", { required: true })}
            type="text"
            placeholder="2–3"
            className="input input-bordered w-full"
          />
          {errors.deliveryTime?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* Return Policy */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Return Policy</label>
          <input
            {...register("returnPolicy", { required: true })}
            type="number"
            placeholder="7 days easy return"
            className="input input-bordered w-full"
          />
          {errors.returnPolicy?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* email */}
        <div>
          <label className="text-gray-400 font-semibold text-sm">Your Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500">email is required</span>
          )}
        </div>
        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="text-gray-400 font-semibold text-sm mr-4 block">Product Image URL</label>
          <input
            onChange={handleImageUploade}
            type="file"
            className="cursor-pointer input"
          />
          {upLoading && (
            <p className="text-blue-600 mt-1 animate-pulse">Uploading ......</p>
          )}
          {productImage && (
            <img
              src={productImage}
              alt="Preview"
              className="w-60 h-60 object-cover rounded-lg mt-3 border"
            />
          )}
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-gray-400 font-semibold text-sm">Product Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write product details here..."
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
          {errors.description?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <p className="text-red-500">Verify carefully before adding the product</p>
        {/* Submit */}
        <div className="md:col-span-2">
          {upLoading ? (
            "Image Uploading..."
          ) : (
            <button
              type="submit"
              className="btn border-none bg-indigo-900 text-white w-full"
            >
              <FaPlusSquare /> Add Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProducts;

import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/Sectiontitle/SectionTitle";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SellerApplication = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [shopLogo, setShopLogo] = useState("");
  const [upLoading, setUploading] = useState(false);

  const handleImageUploade = async (e) => {
    const image = e.target.files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadeUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadeUrl, formData);
    setShopLogo(res.data.data.url);
    setUploading(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (!shopLogo) {
      Swal.fire("Please upload your shop logo!");
      return;
    }
    Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to apply for a seller account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, apply",
    }).then((result) => {
      if (result.isConfirmed) {
        const newApplication = {
          ...data,
          image: shopLogo,
          status: "pending",
          created_at: new Date().toISOString(),
        };
        console.log(newApplication);
        axiosSecure.post("/sellers", newApplication).then((res) => {
          if (res.data.insertedId) {
            console.log(res.data);
            Swal.fire(
              "Success!",
              "Your seller request has been submitted.",
              "success"
            );
          }
        });
      }
    });
  };
  return (
    <div className="bg-indigo-50 p-4">
      <SectionTitle
        sectionTitle={"Apply Now"}
        sectionSubTitle={"Apply to creat a Selling Account!"}
      ></SectionTitle>
      <div className="p-8 rounded-2xl max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Shop Name */}
          <div>
            <label className="font-semibold">Shop Name</label>
            <input
              {...register("shopName", { required: "Shop Name is required" })}
              type="text"
              placeholder="Your Shop Name"
              className="input input-bordered w-full"
            />
            {errors.shopName && (
              <span className="text-red-500">{errors.shopName.message}</span>
            )}
          </div>

          {/* Owner Name */}
          <div>
            <label className="font-semibold">Owner Name</label>
            <input
              {...register("ownerName", { required: true })}
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
            {errors.ownerName && (
              <span className="text-red-500">Name is Required</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-red-500">Email is Required</span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              {...register("phone", { required: true })}
              type="number"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <span className="text-red-500">Phone Number is Required</span>
            )}
          </div>

          {/* Shop Category */}
          <div>
            <label className="font-semibold">Shop Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select Category
              </option>
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Groceries</option>
              <option>Beauty & Health</option>
              <option>Home & Living</option>
              <option>Sports & Fitness</option>
              <option>Books & Stationery</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          {/* nid no Number */}
          <div>
            <label className="font-semibold">
              National ID / Passport Number
            </label>
            <input
              {...register("nidNo", { required: true })}
              type="number"
              placeholder="National ID / Passport Number"
              className="input input-bordered w-full"
            />
            {errors.nidNo && (
              <span className="text-red-500">National id is Required</span>
            )}
          </div>
          {/* Bank Account */}
          <div>
            <label className="font-semibold">Bank Account Number</label>
            <input
              {...register("bankAccount", {
                required: "Bank account is required",
              })}
              type="number"
              placeholder="Bank Account Number"
              className="input input-bordered w-full"
            />
            {errors.bankAccount && (
              <span className="text-red-500">{errors.bankAccount.message}</span>
            )}
          </div>
          {/* Shop Address */}
          <div className="md:col-span-2">
            <label className="font-semibold">Shop Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              placeholder="Shop Address"
              className="input input-bordered w-full"
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>
          {/* Shop Logo */}
          <div className="md:col-span-2">
            <label className="font-semibold mr-4 block">Shop Logo</label>
            <input
              onChange={handleImageUploade}
              type="file"
              className="cursor-pointer input"
            />
            {upLoading && (
              <p className="text-blue-600 mt-1 animate-pulse">
                Uploading ......
              </p>
            )}
            {shopLogo && (
              <img
                src={shopLogo}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mt-3 border"
              />
            )}
          </div>
          {/* Terms */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                {...register("terms", {
                  required: "You must accept the terms",
                })}
                type="checkbox"
                className="checkbox"
              />{" "}
              I agree to the Terms & Conditions
            </label>
            {errors.terms && (
              <span className="text-red-500">{errors.terms.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              Apply for Seller Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerApplication;

import axios from "axios";
import AddProductForm from "../AddProductForm/AddProductForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [productImages, setProductImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm();

  const selectedCategory = watch("category");

  const handleMultiImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (productImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setUploading(true);
    const uploadedImages = [];
    for (let file of files) {
      const fd = new FormData();
      fd.append("image", file);
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(url, fd);
      uploadedImages.push(res.data.data.display_url);
    }
    const finalList = [...productImages, ...uploadedImages];
    setProductImages(finalList);
    setValue("images", finalList, { shouldValidate: true });

    setUploading(false);
  };
  
  
  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      rating: 0,
      email: user?.email,
      createdAt: new Date(),
    };
    const res = await axiosSecure.post(`/products`, finalData);
    if (res.data.insertedId) {
      toast.success("Product add successfully !");
      reset();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase">Add New Product</h2>
      <p className="text-sm text-gray-500 mb-8">
        A smart, lightweight platform crafted for travelers and explorers.
        Navigate, discover, and manage everything with ease.
      </p>
      <AddProductForm
        handleMultiImageUpload={handleMultiImageUpload}
        onSubmit={onSubmit}
        errors={errors}
        productImages={productImages}
        selectedCategory={selectedCategory}
        register={register}
        handleSubmit={handleSubmit}
        uploading={uploading}
      />
    </div>
  );
};

export default AddProduct;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../../Components/Loading/Loading";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const { register, reset, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });
  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);
  // update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/products/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["single-product", id]);
      queryClient.invalidateQueries(["product"]);
      navigate("/dashboard/my-shop");
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-white border rounded p-4 md:p-6">
      <h2 className="text-xl font-bold">
        Update Your Product{" "}
        <span className="text-sm text-gray-500 font-light">({id})</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Exercitationem, rerum!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1 */}
          <div className="flex flex-col">
            <label className="text-sm">Product Name *</label>
            <input
              {...register("productName", {
                required: "Product name is required",
              })}
              type="text"
              className="input w-full focus:border-none"
            />
          </div>
          {/* 2 */}
          <div className="flex flex-col">
            <label className="text-sm">Brand *</label>
            <input
              {...register("brand", { required: "Brand is required" })}
              type="text"
              className="input w-full focus:border-none"
            />
          </div>
          {/* 3 */}
          <div className="flex flex-col">
            <label className="text-sm">Regular Price *</label>
            <input
              {...register("regularPrice", {
                required: "Reguler price is required",
              })}
              type="number"
              className="input w-full focus:border-none"
            />
          </div>
          {/* 4 */}
          <div className="flex flex-col">
            <label className="text-sm">Discount Price</label>
            <input
              {...register("discountPrice")}
              type="number"
              className="input w-full focus:border-none"
            />
          </div>
          {/* 5 */}
          <div className="flex flex-col">
            <label className="text-sm">Stock Quantity *</label>
            <input
              {...register("stockQua", {
                required: "stock Quantity is required",
              })}
              type="number"
              className="input w-full focus:border-none"
            />
          </div>
          {/* 6 */}
          <div className="flex flex-col">
            <label className="text-sm">Return Policy *</label>
            <select
              {...register("returnPolicy", {
                required: "Return policy is required",
              })}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">Select Return Policy</option>
              <option value="no-return">No Return</option>
              <option value="3-days">3 Days Return</option>
              <option value="7-days">7 Days Return</option>
              <option value="10-days">10 Days Return</option>
              <option value="14-days">14 Days Return</option>
              <option value="30-days">30 Days Return</option>
              <option value="6-month">6 month Return</option>
              <option value="1-year">1 year Return</option>
              <option value="2-year">2 year Return</option>
            </select>
          </div>
        </div>
        <div>
          {/* Short Description */}
          <div className="flex flex-col mt-4">
            <label className="text-sm">Short Description *</label>
            <input
              {...register("shortDescription", {
                required: "Short description is required",
                maxLength: {
                  value: 70,
                  message: "Maximum 70 characters allowed",
                },
              })}
              type="text"
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          {/* Long Description */}
          <div className="flex flex-col mt-4">
            <label className="text-sm">Long Description *</label>
            <textarea
              {...register("longDescription", {
                required: "Long description is required",
                minLength: {
                  value: 50,
                  message: "Minimum 50 characters required",
                },
              })}
              className="border px-3 py-2 rounded w-full min-h-[150px]"
            ></textarea>
          </div>
        </div>
        <button className="btn btn-primary w-full" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

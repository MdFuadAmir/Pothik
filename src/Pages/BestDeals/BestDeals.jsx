import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Product from "../Products/Product";
import CompoLoading from "../../Components/CompoLoading/CompoLoading";
import useAxios from "../../Hooks/useAxios";

const BestDeals = () => {
  const axiosInstance = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["bestDeals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products?limit=10");
      return res.data;
    },
  });

  const products = data?.products || [];

  if (isLoading) return <CompoLoading />;

  return (
    <div className="my-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-6 mt-12">
        <h2 className="text-3xl font-bold text-white dark:text-emerald-400 px-4 py-2 rounded-md w-fit bg-gray-900/10 dark:bg-white/10">
          For You
        </h2>
        <Link
          to="/products"
          className="
            px-6 py-2 rounded-lg font-medium
            border border-green-500
            text-green-600 dark:text-green-400
            hover:bg-green-50 dark:hover:bg-slate-900
            transition
          "
        >
          All Deals
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.isArray(products) &&
          products.map((pro) => <Product key={pro._id} pro={pro} />)}
      </div>
      {/* Bottom Button */}
      <div className="flex justify-center">
        <Link
          to="/products"
          className="
            mt-12 px-8 py-2 rounded-lg font-medium
            border border-green-500
            text-green-600 dark:text-green-400
            hover:bg-green-50 dark:hover:bg-slate-900
            transition
          "
        >
          All Deals
        </Link>
      </div>
    </div>
  );
};

export default BestDeals;

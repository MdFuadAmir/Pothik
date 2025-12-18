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
    <div className="my-12">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-6 mt-12">
        <h2 className="text-2xl font-semibold">For You</h2>

        <Link
          to="/products"
          className="btn btn-outline border-green-500 border-2 px-6"
        >
          All Deals
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.isArray(products) &&
          products.map((pro) => <Product key={pro._id} pro={pro} />)}
      </div>
    </div>
  );
};

export default BestDeals;

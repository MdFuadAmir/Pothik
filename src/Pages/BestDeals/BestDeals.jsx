import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Product from "../Products/Product";

const BestDeals = () => {
  const axiosInstance = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["simple-products"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/products?limit=20`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-2xl font-semibold">For You</h2>

        <Link
          to="/products"
          className="btn btn-outline border-green-500 border-2 px-6"
        >
          All Deals
        </Link>
      </div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.slice(0, 20).map((pro) => (
          <Product key={pro._id} pro={pro} />
        ))}
      </div>
    </div>
  );
};

export default BestDeals;

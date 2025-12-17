/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import ProCategory from "../Category/proCategory";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Product from "./Product";

const Products = () => {
  const axiosInstance = useAxios();
  const [params, setParams] = useSearchParams();
  const category = params.get("category");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const url = category ? `/products?category=${category}` : `/products`;
      const res = await axiosInstance.get(url);
      return res.data;
    },
  });
  return (
    <div className="py-4  md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
      <div className="col-span-1 w-full">
        <ProCategory />
      </div>
      {isLoading ? (
        <div className=" col-span-4"><Loading /></div>
      ) : (
        <div className="col-span-4">
          <div>
            <h2 className="text-xl font-bold mb-6">All Collections</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((pro) => (
              <Product key={pro._id} pro={pro} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

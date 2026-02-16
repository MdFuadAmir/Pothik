import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import CompoLoading from "../../Components/CompoLoading/CompoLoading";
import { useState } from "react";
import ProCategory from "../Category/ProCategory";
import Pagination from "../../Components/Pagination/Pagination";

const Products = () => {
  const axiosInstance = useAxios();
  const [params] = useSearchParams();
  const category = params.get("category");

  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["products", category, currentPage, itemsPerPage],
    queryFn: async () => {
      const url = category
        ? `/products?category=${category}&page=${currentPage}&size=${itemsPerPage}`
        : `/products?page=${currentPage}&size=${itemsPerPage}`;
      const res = await axiosInstance.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const totalProducts = data?.total || 0;

  const numOfPages = Math.ceil(totalProducts / itemsPerPage) || 1;

  const handleItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <h1 className="mt-6 text-center text-4xl font-bold underline text-emerald-400">
        All Products
      </h1>

      <div className="col-span-1 w-full">
        <ProCategory />
      </div>

      <div className="py-4 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
        {isLoading ? (
          <div className="col-span-5">
            <CompoLoading />
          </div>
        ) : (
          <div className="col-span-5">
            <h2 className="text-2xl text-white dark:text-emerald-400 px-4 py-2 rounded bg-white/10 w-fit font-bold mb-6">
              {category ? `${category} Products` : "All Products"} (
              {totalProducts})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {products.map((pro) => (
                <Product key={pro._id} pro={pro} />
              ))}
            </div>

            {/* ✅ New Pagination (your custom one) */}
            <div className="flex justify-center items-center gap-4 my-24">
              <Pagination
                page={currentPage + 1}
                setPage={(p) => setCurrentPage(p - 1)}
                totalPages={numOfPages}
              />

              <select
                value={itemsPerPage}
                onChange={handleItemsPerPage}
                className="border rounded px-2 py-1 border-emerald-400 text-emerald-400"
              >
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

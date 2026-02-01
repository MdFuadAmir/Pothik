/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import CompoLoading from "../../Components/CompoLoading/CompoLoading";
import { useState, useEffect } from "react";
import ProCategory from "../Category/ProCategory";

const Products = () => {
  const axiosInstance = useAxios();
  const [params] = useSearchParams();
  const category = params.get("category");

  const [itemsPerPage, setItemsPerPage] = useState(20);
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
  const pages = [...Array(numOfPages).keys()];

  const handleItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < numOfPages - 1) setCurrentPage(currentPage + 1);
  };
  return (
    <div>
      <h1 className="mt-6 text-center text-4xl font-bold underline text-black dark:text-white">All Products</h1>
      <div className="col-span-1 w-full">
        <ProCategory />
      </div>
      <div className="py-4 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
        {/* Products */}
        {isLoading ? (
          <div className="col-span-5">
            <CompoLoading />
          </div>
        ) : (
          <div className="col-span-5">
            <h2 className="text-xl text-black dark:text-white font-bold mb-6">
              {category ? `${category} Products` : "All Products"} (
              {totalProducts})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {products.map((pro) => (
                <Product key={pro._id} pro={pro} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center mt-12 gap-4 items-center">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-white/30 dark:bg-gray-800/90 text-black dark:text-white rounded"
              >
                Previous
              </button>

              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-full ${currentPage === page ? "bg-indigo-500 border-none text-white" : "bg-indigo-500/20 text-white"}`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === numOfPages - 1}
                className="px-4 py-2 bg-white/30 dark:bg-gray-800/90 text-black dark:text-white rounded"
              >
                Next
              </button>

              <select
                value={itemsPerPage}
                onChange={handleItemsPerPage}
                className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
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

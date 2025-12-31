/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import ProCategory from "../Category/proCategory";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import CompoLoading from "../../Components/CompoLoading/CompoLoading";
import { useState,useEffect } from "react";

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
    <div className="py-4 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
      {/* Category sidebar */}
      <div className="col-span-1 w-full">
        <ProCategory />
      </div>
      {/* Products */}
      {isLoading ? (
        <div className="col-span-4">
          <CompoLoading />
        </div>
      ) : (
        <div className="col-span-4">
          <h2 className="text-xl font-bold mb-6">
            {category ? `${category} Products` : "All Products"} ({totalProducts})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((pro) => (
              <Product key={pro._id} pro={pro} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center mt-12 gap-4 items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="btn dark:bg-gray-800  border-none dark:text-white"
            >
              Previous
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn ${currentPage === page ? "bg-amber-500 border-none text-white" : "border-none"}`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === numOfPages - 1}
              className="btn dark:bg-gray-800  border-none dark:text-white"
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
  );
};

export default Products;

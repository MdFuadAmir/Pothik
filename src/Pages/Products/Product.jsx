import { Link } from "react-router";

const Product = ({ pro }) => {
  return (
    <Link
      to={`/product/${pro._id}`}
      className="
        p-3 rounded-xl
        bg-gray-900/70
        shadow-md dark:shadow-black/40
        hover:shadow-lg transition
      "
    >
      {/* Image */}
      <img
        src={pro.images?.[0]}
        alt={pro?.productName}
        className="w-full  md:h-32 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 mt-3">
        <h2 className="text-sm font-semibold line-clamp-2 text-gray-100 ">
          {pro?.productName}
        </h2>

        <p className="text-xs mt-1 text-gray-300 ">{pro?.shortDescription}</p>

        <div className="flex-grow" />

        <div className="flex gap-3 mt-3 items-center">
          {pro?.discountPrice ? (
            <>
              <p className="text-xs text-gray-400 line-through font-medium">
                ${pro?.regularPrice}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 font-bold">
                ${pro?.discountPrice}
              </p>
            </>
          ) : (
            <p className="text-sm text-green-600 dark:text-green-400 font-bold">
              ${pro?.regularPrice}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;

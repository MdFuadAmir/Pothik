import { Link } from "react-router";

const Product = ({ pro }) => {
  return (
    <Link
      to={`/product/${pro._id}`}
      className="
        p-3 rounded-xl
        bg-gray-500/10 dark:bg-gray-500/10
        shadow-md dark:shadow-black/40
        hover:shadow-lg transition
      "
    >
      {/* Image */}
      <img
        src={pro.images?.[0]}
        alt={pro?.productName}
        className="w-full h-28 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 mt-3">
        <h2 className="text-sm font-semibold line-clamp-2 text-gray-800 dark:text-gray-200">
          {pro?.productName}
        </h2>

        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          {pro?.shortDescription}
        </p>

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

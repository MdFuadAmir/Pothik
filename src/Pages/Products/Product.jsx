import { Link } from "react-router";

const Product = ({ pro }) => {
  return (
    <Link
      to={`/product/${pro._id}`}
      className="p-2 rounded shadow-xl dark:shadow-gray-800 bg-white dark:bg-gray-800"
    >
      {/* Image */}
      <img
        src={pro.images?.[0]}
        alt={pro?.productName}
        className="w-full h-28 object-cover rounded"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 mt-2">
        <h2 className="text-sm font-bold line-clamp-2 overflow-hidden dark:text-white">
          {pro?.productName}
        </h2>
        <p className="text-xs mt-1 text-gray-600 text-left dark:text-gray-300">{pro?.shortDescription}</p>
        <div className="flex-grow"></div>
        <div className="flex gap-4 mt-2">
          {pro?.discountPrice ? (
            <div className="flex items-center gap-2">
              <p className="text-red-500 line-through text-sm font-semibold">
                ${pro?.regularPrice}
              </p>
              <p className="text-green-600 font-bold text-sm">
                ${pro?.discountPrice}
              </p>
            </div>
          ) : (
            <p className="text-green-600 font-bold text-sm">
              ${pro?.regularPrice}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;

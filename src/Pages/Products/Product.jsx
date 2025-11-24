import { Link } from "react-router";


const Product = ({ pro }) => {
  return (
    <Link to={`/product/${pro._id}`}  className="border p-2 rounded hover:shadow-xl bg-white ">
      {/* Image */}
      <img
        src={pro.images?.[0]}
        alt={pro.title}
        className="w-full h-28 object-cover rounded"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 mt-2">
        {/* Title → fixed height (2 lines max) */}
        <h2 className="text-sm font-medium line-clamp-2 overflow-hidden min-h-[44px]">
          {pro?.title}
        </h2>
        {/* Spacer pushes price to bottom */}
        <div className="flex-grow"></div>
        {/* Price → always bottom aligned */}
        <div className="flex gap-4">
          <p className="text-green-500 font-bold text-sm">${pro?.offerPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;

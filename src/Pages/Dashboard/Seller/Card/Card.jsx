import { NavLink } from "react-router";


const Card = ({ product, onDelete,onUpdate }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      {/* Product Image */}
      <img
        src={product.images?.[0]}
        alt={product.productName}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="text-lg font-bold">{product.productName}</h3>
        <p className="text-sm text-gray-500">Category: {product.category}</p>

        {/* Price */}
        <div className="mt-2">
          <p className="text-sm text-gray-700">
            Regular Price:{" "}
            <span className="font-semibold">${product.regularPrice}</span>
          </p>
          <p className="text-sm text-green-600">
            Discount Price:{" "}
            <span className="font-semibold">${product.discountPrice}</span>
          </p>
        </div>
        {/* Stock */}
        <p className="text-sm mt-2">Stock: {product.stockQua}</p>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        {/* Update Button */}
        <button
          onClick={() => onUpdate(product)}
          className="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded-md text-sm"
        >
          Update
        </button>
        {/* Delete Button */}
        <button
          onClick={() => onDelete(product._id)}
          className="px-3 cursor-pointer py-1 bg-red-600 text-white rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;

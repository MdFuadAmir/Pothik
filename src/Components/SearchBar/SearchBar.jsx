import { FaCartPlus } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center rounded-b-xl justify-center gap-4 md:gap-12 mt-6">
        <div className="flex">
      <input
        type="text"
        placeholder="Search products..."
        className="w-46 md:w-60 lg:w-96 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
        Search
      </button>
        </div>
        <FaCartPlus size={25}/>
    </div>
  );
};

export default SearchBar;

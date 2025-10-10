import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
         <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white">
      <FaLock size={80} className="text-red-500 mb-6 animate-pulse" />
      <h1 className="text-5xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        You don’t have permission to access this page.  
        Please contact your administrator or return to the homepage.
      </p>
      <Link
        to="/"
        className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white px-6 py-2 rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
    );
};

export default Forbidden;
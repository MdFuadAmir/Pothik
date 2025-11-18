import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <FaExclamationTriangle size={80} className="text-red-500 mb-6" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6 text-center">
        Oops! Page Not Found. <br /> The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

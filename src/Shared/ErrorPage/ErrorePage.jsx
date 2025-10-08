import { Link } from "react-router";

const ErrorePage = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-4">
      <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">404</h1>
      <p className="text-2xl font-semibold mt-4">Oops! Page Not Found</p>
      <p className="text-gray-400 mt-2">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
      >
        Back to Home
      </Link>

      <div className="absolute bottom-5 text-gray-500 text-sm">
        © {new Date().getFullYear()} — All Rights Reserved
      </div>
    </div>
    );
};

export default ErrorePage;
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FaSpinner size={50} className="text-blue-600 animate-spin" />
    </div>
  );
};

export default Loading;

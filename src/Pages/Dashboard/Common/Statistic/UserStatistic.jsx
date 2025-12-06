import {
  FaCompressAlt,
  FaFacebookMessenger,
  FaShoppingBag,
  FaSolarPanel,
  FaTruck,
} from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";

const UserStatistic = () => {
  const { user } = useAuth();
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          <span className="text-green-500">{user?.displayName}</span> Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Welcome Back!</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Total Orders</h2>
            <FaShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-3">12</p>
        </div>

        {/* Delivered */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Delivered</h2>
            <FaTruck className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-3">7</p>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Pending</h2>
            <FaCompressAlt className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-3">3</p>
        </div>

        {/* Cancelled */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Cancelled</h2>
            <FaFacebookMessenger className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold mt-3">2</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          <div className="p-4 border rounded-xl flex justify-between items-center">
            <span>Order #12345</span>
            <span className="text-green-600 font-semibold">Delivered</span>
          </div>

          <div className="p-4 border rounded-xl flex justify-between items-center">
            <span>Order #12346</span>
            <span className="text-yellow-600 font-semibold">Pending</span>
          </div>

          <div className="p-4 border rounded-xl flex justify-between items-center">
            <span>Order #12347</span>
            <span className="text-red-600 font-semibold">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistic;

import { FaUsers, FaShoppingCart, FaBox, FaDollarSign } from "react-icons/fa";

const AdminStatistic = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Overview of your platform’s performance and activities.
        </p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl text-3xl">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <h2 className="text-xl font-bold">1,284</h2>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-green-100 text-green-600 rounded-xl text-3xl">
            <FaShoppingCart />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <h2 className="text-xl font-bold">987</h2>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-xl text-3xl">
            <FaBox />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Products</h3>
            <h2 className="text-xl font-bold">742</h2>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded-xl text-3xl">
            <FaDollarSign />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <h2 className="text-xl font-bold">$45,870</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 h-[350px] flex items-center justify-center text-gray-400">
          📊 Sales Chart Placeholder
        </div>

        <div className="bg-white rounded-xl shadow p-6 h-[350px] flex items-center justify-center text-gray-400">
          📈 Users Growth Placeholder
        </div>
      </div>

      {/* Latest Orders Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Recent Orders</h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Mahfuz</td>
                <td>Wireless Earbud</td>
                <td>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Delivered
                  </span>
                </td>
                <td>12 Feb 2025</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Fuad</td>
                <td>Smart Watch</td>
                <td>
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
                <td>11 Feb 2025</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Riyan</td>
                <td>Bluetooth Speaker</td>
                <td>
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                    Shipped
                  </span>
                </td>
                <td>10 Feb 2025</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistic;

import {
  FaShoppingCart,
  FaBox,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";

const SellerStatistic = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Seller Dashboard</h1>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Manage your products, track sales, and monitor your shop performance.
        </p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Products */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl text-3xl">
            <FaBox />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">My Products</h3>
            <h2 className="text-xl font-bold">120</h2>
          </div>
        </div>

        {/* Orders Received */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-green-100 text-green-600 rounded-xl text-3xl">
            <FaShoppingCart />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Orders Received</h3>
            <h2 className="text-xl font-bold">85</h2>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded-xl text-3xl">
            <FaDollarSign />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Earnings</h3>
            <h2 className="text-xl font-bold">$4,560</h2>
          </div>
        </div>

        {/* Ratings */}
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-xl text-3xl">
            <FaStar />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Avg. Rating</h3>
            <h2 className="text-xl font-bold">4.7</h2>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 h-[350px] flex items-center justify-center text-gray-400">
          📈 Sales This Month (Chart Placeholder)
        </div>

        <div className="bg-white rounded-xl shadow p-6 h-[350px] flex items-center justify-center text-gray-400">
          📊 Product Performance (Chart Placeholder)
        </div>
      </div>

      {/* Latest Added Products */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Recently Added Products</h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Winter Jacket</td>
                <td>$35</td>
                <td>120</td>
                <td>10 Feb 2025</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bluetooth Speaker</td>
                <td>$25</td>
                <td>80</td>
                <td>08 Feb 2025</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Sports Shoe</td>
                <td>$45</td>
                <td>60</td>
                <td>07 Feb 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Recent Customer Orders</h3>

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
                <td>Afsana</td>
                <td>Fashion Bag</td>
                <td>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    Delivered
                  </span>
                </td>
                <td>11 Feb 2025</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Jubayer</td>
                <td>Casual Hoodie</td>
                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    Shipped
                  </span>
                </td>
                <td>10 Feb 2025</td>
              </tr>

              <tr>
                <td>3</td>
                <td>Nazmul</td>
                <td>Sports Shoe</td>
                <td>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                    Pending
                  </span>
                </td>
                <td>09 Feb 2025</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default SellerStatistic;

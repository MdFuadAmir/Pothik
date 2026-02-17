import {
  FaUsers,
  FaBox,
  FaUserClock,
  FaStore,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-gray-900/80 rounded-xl shadow p-5 flex items-center gap-4">
    <div
      className={`p-4 bg-${color}-100 text-${color}-600 rounded-xl text-3xl`}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-gray-100 text-sm ">{title}</h3>
      <h2 className="text-xl font-bold text-white">{value}</h2>
    </div>
  </div>
);

const AdminStatistic = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stat");
      return res.data;
    },
  });

  if (isLoading) return <CompoLoading />;

  const {
    totalUsers,
    totalProducts,
    revenue,
    totalSellers,
    recentSellerRequests,
    pendingSellerRequests,
  } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between md:items-center gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">
            Pothik Admin
          </h1>
          <p className="text-gray-300 mt-1 text-sm">
            Overview of your platform’s performance and activities.
          </p>
        </div>
        <div className="bg-gray-900/80 p-4 rounded shadow-xl flex gap-2 items-center">
          <img
            src={user.photoURL}
            alt="/photo"
            className="w-12 h-12 rounded-full"
          />
          <div className="p-2 border-l text-white space-y-1">
            <h2 className="font-bold dark:text-white">{user.displayName}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value={totalUsers}
          color="blue"
        />
        <StatCard
          icon={<FaStore />}
          title="Verified Seller"
          value={`${totalSellers}`}
          color="green"
        />
        <StatCard
          icon={<FaUserClock />}
          title="Pending Seller"
          value={`${pendingSellerRequests}`}
          color="orange"
        />
        <StatCard
          icon={<FaBox />}
          title="Total Products"
          value={totalProducts}
          color="purple"
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Platfrom Revenue"
          value={`$${revenue}`}
          color="yellow"
        />
      </div>
      {/* Recent Seller Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gray-900/80">
          <h3 className="text-lg font-bold mb-4 text-white">
            Recent Seller Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th>#</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSellerRequests.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-300">
                      No seller requests found
                    </td>
                  </tr>
                )}
                {recentSellerRequests.map((req, index) => (
                  <tr key={req.id} className="text-gray-300">
                    <td>{index + 1}</td>
                    <td>{req.email}</td>
                    <td>
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {new Date(req.sellerRequestedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistic;

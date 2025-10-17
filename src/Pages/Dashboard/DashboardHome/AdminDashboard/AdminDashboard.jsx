import { FaHourglassHalf, FaMotorcycle, FaStore, FaStoreAlt, FaUsers, FaUserShield } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import SectionTitle from "../../../../Shared/Sectiontitle/SectionTitle";

const AdminDashboard = () => {
  return (
    <div className="p-4">
      {/* Title */}
      <SectionTitle
        sectionTitle="Dashboard Overview"
        sectionSubTitle="Overview of users, sellers, riders, and total orders."
      />
      
      {/* Summary Cards */}
      <h2 className="text-xl font-semibold p-2">Overview Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaUsers size={35} className="text-amber-400" />
          <div>
            <h3 className="text-2xl font-bold">12</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaStore size={35} className="text-purple-400" />
          <div>
            <h3 className="text-2xl font-bold">5</h3>
            <p>Total Sellers</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaMotorcycle size={35} className="text-cyan-400" />
          <div>
            <h3 className="text-2xl font-bold">5</h3>
            <p>Total Riders</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaUserShield size={35} className="text-emerald-400" />
          <div>
            <h3 className="text-2xl font-bold">5</h3>
            <p>Total Admin</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaStoreAlt size={35} className="text-green-400" />
          <div>
            <h3 className="text-2xl font-bold">5</h3>
            <p>Active Seller</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaHourglassHalf size={35} className="text-orange-400" />
          <div>
            <h3 className="text-2xl font-bold">5</h3>
            <p>Pending Seller</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <FaMotorcycle size={35} className="text-green-400" />
          <div>
            <h3 className="text-2xl font-bold">5</h3>
            <p>Active Rider</p>
          </div>
        </div>

        <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-center gap-4 shadow-md">
          <HiOutlineClock size={35} className="text-orange-400" />
          <div>
            <h3 className="text-2xl font-bold">4</h3>
            <p>Pending Rider</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;





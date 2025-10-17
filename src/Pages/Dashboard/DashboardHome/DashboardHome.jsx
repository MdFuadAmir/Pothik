import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../../Shared/Loading/Loading";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import RiderDashboard from "./RiderDashboard/RiderDashboard";
import SellerDashboard from "./SellerDashboard/SellerDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";


const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loading />;

  if (role === "admin") return <AdminDashboard></AdminDashboard>;
  if (role === "seller") return <SellerDashboard></SellerDashboard>;
  if (role === "rider") return <RiderDashboard></RiderDashboard>;
  return <UserDashboard></UserDashboard>;
};

export default DashboardHome;

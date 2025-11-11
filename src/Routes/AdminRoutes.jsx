import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();
  if (loading || roleLoading) {
    return <Loading />;
  }
  if (!user || role !== "admin") {
    return (
      <Navigate state={{ from: location?.pathname }} to="/forbidden"></Navigate>
    );
  }
  return children;
};

export default AdminRoutes;

// import useAuth from "../Hooks/useAuth";
// import useRole from "../Hooks/useRole";
// import Loading from "../Components/Loading/Loading";
// import { Navigate, useLocation } from "react-router";

// const AdminRoutes = ({ children }) => {
//   const { user, loading } = useAuth();
//   const { role, roleLoading } = useRole();
//   const location = useLocation();
//   if (loading || roleLoading) {
//     return <Loading />;
//   }
//   if (!user || role !== "admin") {
//     return (
//       <Navigate state={{ from: location?.pathname }} to="/forbidden"></Navigate>
//     );
//   }

//   return children;
// };

// export default AdminRoutes;


import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();
  if (loading || roleLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (role !== "admin") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdminRoutes;

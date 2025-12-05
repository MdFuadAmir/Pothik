import Loading from "../../../../Components/Loading/Loading";
import useRole from "../../../../Hooks/useRole";
import AdminStatistic from "./AdminStatistic";
import SellerStatistic from "./SellerStatistic";
import UserStatistic from "./UserStatistic";

const Statistic = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return <Loading />;
  }
  return (
    <div>
      {role === "admin" && <AdminStatistic />}
      {role === "seller" && <SellerStatistic />}
      {role === "user" && <UserStatistic />}
    </div>
  );
};

export default Statistic;

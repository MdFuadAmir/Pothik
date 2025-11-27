import AdminStatistic from "./AdminStatistic";
import SellerStatistic from "./SellerStatistic";
import UserStatistic from "./UserStatistic";

const Statistic = () => {
    return (
        <div>
            <AdminStatistic/>
            <UserStatistic/>
            <SellerStatistic/>
        </div>
    );
};

export default Statistic;
import { FaRoute, FaShoppingBag } from "react-icons/fa";
import DashboardMenu from "./DashboardMenu";


const UserMenu = ({closeSidebar}) => {
    return (
        <div className="space-y-2">
            <DashboardMenu
                labal={"My Orders"}
                to={"/dashboard/my-orders"}
                icon={FaShoppingBag}
                onClick={closeSidebar}
              />
              <DashboardMenu
                labal={"Tracking Orders"}
                to={"/dashboard/track-order"}
                icon={FaRoute}
                onClick={closeSidebar}
              />
            
        </div>
    );
};

export default UserMenu;
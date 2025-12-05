import { FaUsersCog } from "react-icons/fa";
import DashboardMenu from "./DashboardMenu";

const AdminMenu = ({closeSidebar}) => {
  return (
    <div className="space-y-2"> 
      <DashboardMenu
        labal={"Manage Users"}
        to={"/dashboard/manage-users"}
        icon={FaUsersCog}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default AdminMenu;

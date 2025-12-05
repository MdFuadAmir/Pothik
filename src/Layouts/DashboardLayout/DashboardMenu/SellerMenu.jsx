import DashboardMenu from "./DashboardMenu";
import { AiFillShop } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
const SellerMenu = ({ closeSidebar }) => {
  return (
    <div className="space-y-2">
      <DashboardMenu
        labal={"My Shop"}
        to={"/dashboard/my-shop"}
        icon={AiFillShop}
        onClick={closeSidebar}
      />
      <DashboardMenu
        labal={"Add Product"}
        to={"/dashboard/add-product"}
        icon={FaPlusCircle}
        onClick={closeSidebar}
      />
      <DashboardMenu
        labal={"Manage Orders"}
        to={"/dashboard/manage-orders"}
        icon={MdAssignmentAdd}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default SellerMenu;
